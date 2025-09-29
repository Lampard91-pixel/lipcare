"use server";

import { addProduct as addProductToDb } from "@/lib/firestore/products";
import { uploadImage as uploadImageToStorage } from "@/lib/firestore/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const stock = Number(formData.get("stock"));
  const status = formData.get("status") as "Active" | "Inactive";
  const imageFile = formData.get("image") as File;

  if (!name || !price || !category || !stock || !imageFile || imageFile.size === 0) {
    return { error: "All fields including an image are required." };
  }

  try {
    const imageUrl = await uploadImageToStorage(imageFile);

    await addProductToDb({
      name,
      price,
      category,
      stock,
      status,
      imageUrl,
    });
  } catch (error) {
    console.error("Failed to create product:", error);
    return { error: "Something went wrong. Could not create product." };
  }

  // Revalidate the paths to show the new product
  revalidatePath("/admin/products");
  revalidatePath("/shop");

  redirect("/admin/products");
}