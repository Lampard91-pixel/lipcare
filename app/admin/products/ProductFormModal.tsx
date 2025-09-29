"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Product, addProduct, updateProduct } from "@/lib/api/products";
import Modal from "./Modal";

type ProductForm = Omit<Product, "_id" | "imageUrl">;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

export default function ProductFormModal({ isOpen, onClose, onSuccess, product }: ProductFormModalProps) {
  const isEditMode = !!product?._id;
  const initialFormState: ProductForm = {
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    status: product?.status || "Active",
  };
  
  const [form, setForm] = useState<ProductForm>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Math.max(0, Number(value) || 0) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading(isEditMode ? "Updating product..." : "Adding product...");

    try {
      if (isEditMode && product) {
        await updateProduct(product._id!, form);
        toast.success("Product updated successfully!", { id: toastId });
      } else {
        await addProduct(form);
        toast.success("Product added successfully!", { id: toastId });
      }
      setForm({ name: "", price: 0, category: "", stock: 0, status: "Active" }); // Reset form state
      onSuccess();
    } catch (error) {
      let message = `Failed to ${isEditMode ? 'update' : 'add'} product.`;
      if (error instanceof Error) {
        // Use the specific error message from the API call if available
        message = error.message;
      }
      toast.error(message, { id: toastId });
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-900">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="e.g. Lip Balm Vanilla" value={form.name} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900" required />
        <div className="grid grid-cols-2 gap-3">
          <input type="number" name="price" placeholder="e.g. 2500" value={form.price} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900" required />
          <input type="number" name="stock" placeholder="e.g. 100" value={form.stock} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900" required />
        </div>
        <input type="text" name="category" placeholder="e.g. Lip Care" value={form.category} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900" required />
        <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className="px-3 py-2 rounded-lg bg-cyan-900 text-white hover:bg-cyan-800 text-sm disabled:opacity-60">
            {isSaving ? (isEditMode ? "Updating..." : "Saving...") : (isEditMode ? "Update Product" : "Save Product")}
          </button>
        </div>
      </form>
    </Modal>
  );
}