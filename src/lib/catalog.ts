import { sampleProducts, type CategorySlug, type Product } from "./products";
import { createPublicClient, isSupabaseConfigured } from "./supabase/server";

type ProductRow = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: CategorySlug;
  price: number | string;
  size: string;
  description: string;
  how_to_use: string;
  image_url: string | null;
  badge: string | null;
  best_seller: boolean;
  active: boolean;
};

// Cores neutras para produtos cadastrados no painel que ainda não têm foto.
const fallbackLook = { shape: "bottle" as const, color: "#f3eee6", capColor: "#d9a3b6", tone: "#ece4d8" };

export function rowToProduct(row: ProductRow): Product {
  return {
    ...fallbackLook,
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    size: row.size,
    description: row.description,
    howToUse: row.how_to_use,
    imageUrl: row.image_url,
    badge: row.badge ? { label: row.badge, highlight: row.best_seller } : undefined,
    bestSeller: row.best_seller,
    active: row.active,
  };
}

// Produtos ativos da loja. Usa o banco quando ele tem produtos; senão, o catálogo de exemplo.
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return sampleProducts;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return sampleProducts;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlug(slug: string) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getBestSellers() {
  const all = await getProducts();
  const best = all.filter((p) => p.bestSeller);
  return (best.length > 0 ? best : all).slice(0, 8);
}

export type { ProductRow };
