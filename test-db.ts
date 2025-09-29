import { MongoClient } from "mongodb";

async function run() {
  try {
    const uri = process.env.MONGODB_URI!;
    const client = new MongoClient(uri);

    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    const db = client.db(process.env.MONGODB_DB || "lips");
    const collections = await db.listCollections().toArray();
    console.log("📂 Collections:", collections.map(c => c.name));

    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

run();
