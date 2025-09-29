import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { Customer } from "@/lib/api/customers";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lips");
    const customers = await db.collection<Customer>("customers").find({}).toArray();
    const normalized = customers.map((c: any) => ({ ...c, _id: c._id?.toString?.() ?? c._id }));
    return NextResponse.json(normalized);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const customer: Omit<Customer, "_id"> = {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      orders: Math.max(0, Number(body.orders) || 0),
    };
    if (!customer.name || !customer.email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db("lips");
    const result = await db.collection<Omit<Customer, "_id">>("customers").insertOne(customer);
    return NextResponse.json({ ...customer, _id: result.insertedId.toString() });
  } catch (e) {
    return NextResponse.json({ error: "Failed to add customer" }, { status: 500 });
  }
}


