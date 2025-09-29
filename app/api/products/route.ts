import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/lib/api/products";

/** GET all products */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lips");
    const products = await db.collection<Product>("products").find({}).toArray();

    // Normalize _id to string for client compatibility
    const normalized = products.map((p: any) => ({
      ...p,
      _id: p._id?.toString?.() ?? p._id,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/** ADD new product */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate and coerce
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const price = Math.max(0, Number(body.price) || 0);
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const stock = Math.max(0, Number(body.stock) || 0);
    const status = body.status === "Inactive" ? "Inactive" : "Active";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const product: Omit<Product, "_id"> = {
      name,
      price,
      category,
      stock,
      status,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db("lips");
    const result = await db.collection<Omit<Product, "_id">>("products").insertOne(product);

    return NextResponse.json({ ...product, _id: result.insertedId.toString() });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
