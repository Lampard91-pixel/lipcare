// lib/mongodb.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please add your MongoDB URI to .env.local as MONGODB_URI");
}

const uri: string = process.env.MONGODB_URI;
const options: Record<string, unknown> = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

declare global {
  // Use `var` so it’s attached to the Node.js global object
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
