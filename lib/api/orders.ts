export type OrderStatus = "Paid" | "Unpaid" | "Pending";

export interface Order {
  _id?: string;
  id?: string; // for legacy UI display
  customer: string;
  date: string; // ISO or YYYY-MM-DD
  price: number;
  status: OrderStatus;
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function addOrder(order: Omit<Order, "_id" | "id">): Promise<Order> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to add order");
  return res.json();
}


