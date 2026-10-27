import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { brl } from "@/lib/format";
import { deadlineInfo, formatDate, splitPayment, statusLabels, type Order } from "@/lib/orders";

export const metadata: Metadata = { title: "Minha conta" };

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/entrar?voltar=/conta");
  const { profile, supabase } = session;

  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  const orders = (data ?? []) as Order[];

  return (
    <div className="paper">
      <section className="block wrap account">
        <div className="head">
          <div className="head-t">
            <div className="eyebrow">Minha conta</div>
            <h1 className="page-title">Olá, {profile.full_name.split(" ")[0] || "cliente"}</h1>
          </div>
          <div className="account-actions">
            {profile.is_admin && <Link className="btn btn-red" href="/painel">Abrir painel da loja</Link>}
            <Link className="btn btn-ink" href="/conta/senha">Trocar senha</Link>
            <form action="/sair" method="post"><button className="btn btn-ink" type="submit">Sair</button></form>
          </div>
        </div>

        <dl className="account-data">
          <div><dt>E-mail</dt><dd>{profile.email}</dd></div>
          <div><dt>Celular</dt><dd>{profile.phone || "—"}</dd></div>
          <div><dt>Cliente desde</dt><dd>{formatDate(profile.created_at)}</dd></div>
        </dl>

        <h2 className="section-title">Meus pedidos</h2>
        {orders.length === 0 ? (
          <div className="empty">
            <p>Você ainda não tem pedidos. Quando fizer o primeiro, ele aparece aqui com cada etapa até chegar na sua casa.</p>
            <Link className="btn btn-red" href="/produtos">Ver a coleção</Link>
          </div>
        ) : (
          <ul className="order-list">
            {orders.map((o) => {
              const d = deadlineInfo(o);
              const { deposit, remaining } = splitPayment(Number(o.total));
              return (
                <li key={o.id} className="order-card">
                  <div className="order-top">
                    <b>Pedido {o.code}</b>
                    <span className={`pill s-${o.status}`}>{statusLabels[o.status]}</span>
                  </div>
                  <p>Feito em {formatDate(o.created_at)} · Total {brl(Number(o.total))} · Entrada {brl(deposit)} · Restante {brl(remaining)}</p>
                  {d && (
                    <p className={d.expired ? "deadline late" : "deadline"}>
                      {d.expired
                        ? "O prazo de 15 dias para pedir o envio terminou."
                        : `Seu pedido está completo. Você tem ${d.daysLeft} dia(s), até ${formatDate(d.deadline)}, para pedir o envio da caixa.`}
                    </p>
                  )}
                  {o.tracking_code && <p>Código de rastreio: <b>{o.tracking_code}</b></p>}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
