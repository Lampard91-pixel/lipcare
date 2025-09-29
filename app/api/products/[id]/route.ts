import { NextResponse } from "next/server";
import { ObjectId, Filter } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/lib/api/products";

type DbProduct = Omit<Product, "_id"> & { _id: ObjectId };

// ✅ GET product by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("lips");

    const productsCol = db.collection<DbProduct>("products");
    let product = await productsCol.findOne({ _id: objectId } as Filter<DbProduct>);
    if (!product) {
      // Fallback: some legacy docs may have string _id
      product = await productsCol.findOne({ _id: params.id as unknown as ObjectId } as Filter<DbProduct>);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ ...product, _id: product._id.toString() });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// ✅ PUT (Update product by ID)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("lips");

    const body = await req.json();

    // Sanitize and coerce fields
    const updateDoc: Omit<Partial<DbProduct>, "_id"> & { updatedAt?: string } = {};
    if (typeof body.name === "string") updateDoc.name = body.name.trim();
    if (body.price !== undefined) updateDoc.price = Math.max(0, Number(body.price) || 0);
    if (typeof body.category === "string") updateDoc.category = body.category.trim();
    if (body.stock !== undefined) updateDoc.stock = Math.max(0, Number(body.stock) || 0);
    if (body.status === "Active" || body.status === "Inactive") updateDoc.status = body.status;
    if (typeof body.imageUrl === "string") updateDoc.imageUrl = body.imageUrl.trim();
    updateDoc.updatedAt = new Date().toISOString();

    const productsCol = db.collection<DbProduct>("products");
    let updated = await productsCol.findOneAndUpdate(
      { _id: objectId } as Filter<DbProduct>,
      { $set: updateDoc },
      { returnDocument: "after" }
    );
    if (!updated || !("value" in updated) || !updated.value) {
      // Fallback for string _id docs
      updated = await productsCol.findOneAndUpdate(
        { _id: params.id as unknown as ObjectId } as Filter<DbProduct>,
        { $set: updateDoc },
        { returnDocument: "after" }
      );
    }

    if (!updated || !('value' in updated) || !updated.value) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const value = (updated as unknown as { value: DbProduct }).value;
    return NextResponse.json({ ...value, _id: value._id.toString() });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// ✅ DELETE product by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("lips");

    const productsCol = db.collection<DbProduct>("products");
    let deleted = await productsCol.deleteOne({ _id: objectId } as Filter<DbProduct>);
    if (deleted.deletedCount === 0) {
      deleted = await productsCol.deleteOne({ _id: params.id as unknown as ObjectId } as Filter<DbProduct>);
    }

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
