// types/product.ts or lib/api/products.ts
import { ObjectId } from "mongodb";

export interface Product {
  _id?: string | ObjectId; // <-- allow both frontend string & MongoDB ObjectId
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "Active" | "Inactive";
  imageUrl?: string;
}
