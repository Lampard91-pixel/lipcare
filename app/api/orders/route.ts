import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { Order } from "@/lib/api/orders";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lips");
    const orders = await db.collection<Order>("orders").find({}).toArray();
    const normalized = orders.map((o: any) => ({ ...o, _id: o._id?.toString?.() ?? o._id, id: o._id?.toString?.() ?? o.id }));
    return NextResponse.json(normalized);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order: Omit<Order, "_id" | "id"> = {
      customer: String(body.customer || "").trim(),
      date: String(body.date || new Date().toISOString()),
      price: Math.max(0, Number(body.price) || 0),
      status: body.status === "Paid" || body.status === "Unpaid" ? body.status : "Pending",
    };
    if (!order.customer) return NextResponse.json({ error: "Customer is required" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db("lips");
    const result = await db.collection<Omit<Order, "_id">>("orders").insertOne(order as any);
    return NextResponse.json({ ...order, _id: result.insertedId.toString(), id: result.insertedId.toString() });
  } catch (e) {
    return NextResponse.json({ error: "Failed to add order" }, { status: 500 });
  }
}


