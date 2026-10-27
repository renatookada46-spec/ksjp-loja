import { rules } from "./site";

export type OrderStatus =
  | "aguardando_entrada"
  | "entrada_paga"
  | "pedido_completo"
  | "envio_solicitado"
  | "enviado"
  | "entregue"
  | "cancelado";

export type Order = {
  id: string;
  code: string;
  user_id: string;
  status: OrderStatus;
  items: { name: string; brand?: string; quantity: number; price: number }[];
  products_total: number;
  shipping_fee: number;
  service_fee: number;
  total: number;
  deposit_paid_at: string | null;
  completed_at: string | null;
  shipping_requested_at: string | null;
  remaining_paid_at: string | null;
  shipped_at: string | null;
  tracking_code: string | null;
  notes: string;
  created_at: string;
};

export const statusLabels: Record<OrderStatus, string> = {
  aguardando_entrada: "Aguardando entrada",
  entrada_paga: "Entrada paga, comprando no Japão",
  pedido_completo: "Pedido completo, aguardando pedido de envio",
  envio_solicitado: "Envio pedido, aguardando restante",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const statusOrder: OrderStatus[] = [
  "aguardando_entrada",
  "entrada_paga",
  "pedido_completo",
  "envio_solicitado",
  "enviado",
  "entregue",
  "cancelado",
];

const DAY = 24 * 60 * 60 * 1000;

// Prazo de 15 dias contado a partir do aviso de pedido completo.
export function deadlineInfo(order: Pick<Order, "status" | "completed_at">) {
  if (order.status !== "pedido_completo" || !order.completed_at) return null;
  const deadline = new Date(new Date(order.completed_at).getTime() + rules.holdDays * DAY);
  const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / DAY);
  return { deadline, daysLeft, expired: daysLeft <= 0 };
}

export function splitPayment(total: number) {
  const deposit = Math.round(total * rules.depositPercent) / 100;
  return { deposit, remaining: Math.round((total - deposit) * 100) / 100 };
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

export function formatDate(value: string | Date | null) {
  return value ? dateFormatter.format(new Date(value)) : "—";
}

export function formatDateTime(value: string | Date | null) {
  return value ? dateTimeFormatter.format(new Date(value)) : "—";
}
