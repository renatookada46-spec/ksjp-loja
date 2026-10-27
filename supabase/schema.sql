-- KSJP: estrutura do banco de dados.
-- Como usar: Supabase → SQL Editor → New query → cole este arquivo inteiro → Run.
-- Pode rodar de novo sem problema: tudo usa "if not exists" / "or replace".

-- ============================================================
-- 1. Perfis de clientes (dados extras além do e-mail e senha)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  email text not null default '',
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

-- Verifica se quem está logado é o dono da loja.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- Cria o perfil automaticamente quando alguém se cadastra.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Impede que um cliente se transforme em administrador editando o próprio perfil.
create or replace function public.protect_admin_flag()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_admin is distinct from old.is_admin and not public.is_admin() then
    new.is_admin := old.is_admin;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_admin on public.profiles;
create trigger profiles_protect_admin
  before update on public.profiles
  for each row execute function public.protect_admin_flag();

alter table public.profiles enable row level security;

drop policy if exists "profiles: cliente vê o próprio" on public.profiles;
create policy "profiles: cliente vê o próprio" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: cliente edita o próprio" on public.profiles;
create policy "profiles: cliente edita o próprio" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- ============================================================
-- 2. Produtos
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand text not null,
  name text not null,
  category text not null check (category in ('skincare', 'protetor-solar', 'cabelo', 'maquiagem', 'kits')),
  price numeric(10, 2) not null check (price >= 0),
  size text not null default '',
  description text not null default '',
  how_to_use text not null default '',
  image_url text,
  badge text,
  best_seller boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "products: todos veem os ativos" on public.products;
create policy "products: todos veem os ativos" on public.products
  for select using (active or public.is_admin());

drop policy if exists "products: só o dono altera" on public.products;
create policy "products: só o dono altera" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- 3. Pedidos (uma caixa por pedido)
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default upper(substr(md5(random()::text), 1, 6)),
  user_id uuid not null references public.profiles (id) on delete restrict,
  status text not null default 'aguardando_entrada' check (status in (
    'aguardando_entrada',  -- pedido feito, esperando os 60%
    'entrada_paga',        -- 60% pagos, vamos comprar no Japão
    'pedido_completo',     -- tudo comprado; começam os 15 dias
    'envio_solicitado',    -- cliente pediu o envio, esperando os 40%
    'enviado',             -- caixa despachada
    'entregue',
    'cancelado'
  )),
  items jsonb not null default '[]'::jsonb,
  products_total numeric(10, 2) not null default 0,
  shipping_fee numeric(10, 2) not null default 0,
  service_fee numeric(10, 2) not null default 150,
  total numeric(10, 2) generated always as (products_total + shipping_fee + service_fee) stored,
  deposit_paid_at timestamptz,
  completed_at timestamptz,
  shipping_requested_at timestamptz,
  remaining_paid_at timestamptz,
  shipped_at timestamptz,
  tracking_code text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

drop policy if exists "orders: cliente vê os próprios" on public.orders;
create policy "orders: cliente vê os próprios" on public.orders
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "orders: só o dono altera" on public.orders;
create policy "orders: só o dono altera" on public.orders
  for all using (public.is_admin()) with check (public.is_admin());

-- Atualiza updated_at automaticamente.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ============================================================
-- 4. Fotos dos produtos (Storage)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "fotos: todos veem" on storage.objects;
create policy "fotos: todos veem" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "fotos: só o dono envia" on storage.objects;
create policy "fotos: só o dono envia" on storage.objects
  for insert with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "fotos: só o dono apaga" on storage.objects;
create policy "fotos: só o dono apaga" on storage.objects
  for delete using (bucket_id = 'product-images' and public.is_admin());
