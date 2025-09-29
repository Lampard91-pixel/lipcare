import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

// Prevent multiple connections in dev
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "lipsDB", // 👈 change db name
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}
