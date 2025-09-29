import { ObjectId } from "mongodb";

// ✅ Shape of product in MongoDB
export interface ProductDB {
  _id: ObjectId;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "Active" | "Inactive";
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Shape of product returned to frontend
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "Active" | "Inactive";
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
