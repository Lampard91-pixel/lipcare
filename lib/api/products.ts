// lib/api/products.ts

async function apiFetch(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`/api${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorBody}`);
  }

  // Handle cases where there is no response body (e.g., DELETE)
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return;
  }

  return res.json();
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  category?: string;
  stock?: number;
  status?: "Active" | "Inactive";
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Fetch all products
export async function getProducts(): Promise<Product[]> {
  return apiFetch("/products");
}

// ✅ Add new product
export async function addProduct(product: Product): Promise<Product> {
  return apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

// ✅ Delete a product
export async function deleteProduct(id: string): Promise<void> {
  return apiFetch(`/products/${id}`, { method: "DELETE" });
}

// ✅ Get product by ID
export async function getProductById(id: string): Promise<Product> {
  return apiFetch(`/products/${id}`);
}

// ✅ Update product
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

// ✅ Upload image (unsigned preset)
export async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/")) throw new Error("File must be an image");
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) throw new Error("Image must be less than 5MB");

  // Upload to Firebase Storage directly from client
  const { uploadImageToStorage } = await import("@/lib/firebase");
  return uploadImageToStorage(file);
}
