import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "your_connection_string_here";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("lipsdb"); // 👈 change to your DB name
    const products = db.collection("products");

    // Find products where price is not a number
    const cursor = products.find({ $or: [{ price: { $type: "string" } }, { price: { $exists: false } }] });

    let fixedCount = 0;
    for await (const doc of cursor) {
      const price = Number(doc.price) || 0;
      await products.updateOne({ _id: doc._id }, { $set: { price } });
      fixedCount++;
    }

    console.log(`✅ Fixed ${fixedCount} product(s)`);
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await client.close();
  }
}

run();
