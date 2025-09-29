"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon, X, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProducts, addProduct, deleteProduct, Product } from "@/lib/api/products";

// ✅ Toast notification component
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-md text-sm font-medium text-white z-50 transition ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null); // no longer used for upload
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    status: "Active" as "Active" | "Inactive",
    imageUrl: "",
  });

  const router = useRouter();

  // ✅ Show toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ✅ Fetch products on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showToast("Failed to fetch products", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "price" || name === "stock") {
        const num = Math.max(0, Number(value) || 0);
        return { ...prev, [name]: num } as any;
      }
      return { ...prev, [name]: value } as any;
    });
  };

  // ✅ Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Add or Update product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const imageUrl = form.imageUrl; // temporarily rely on direct URL only

      if (editingId) {
        const updatedPayload = { ...form, imageUrl: imageUrl || form.imageUrl };
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        });
        if (!res.ok) {
          let message = "Failed to update product";
          try {
            const err = await res.json();
            if (err?.error) message = err.error;
          } catch {}
          throw new Error(message);
        }
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
        showToast("Product updated successfully!", "success");
      } else {
        const newProduct = await addProduct({ ...form, imageUrl });
        setProducts((prev) => [...prev, newProduct]);
        showToast("Product added successfully!", "success");
      }

      // Reset form
      setForm({
        name: "",
        price: 0,
        category: "",
        stock: 0,
        status: "Active",
        imageUrl: "",
      });
      setFile(null);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      const message = (error as Error)?.message || "Failed to save product";
      console.error("Error saving product:", error);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Delete product (on click)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showToast("Product deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete product:", error);
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-cyan-900">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition text-sm sm:text-base"
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </button>
      </div>

      {/* ✅ Add Product Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-900">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="e.g. Lip Balm Vanilla"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="e.g. 2500"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="e.g. Lip Care"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
                required
              />

              <input
                type="number"
                name="stock"
                placeholder="e.g. 100"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
                required
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Image URL (temporary)</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="mt-2 h-28 w-full object-cover rounded-lg border"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-3 py-2 rounded-lg bg-cyan-900 text-white hover:bg-cyan-800 text-sm disabled:opacity-60"
                >
                  {saving ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Products Grid */}
      {loading ? (
        <p className="text-cyan-900">Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
            >
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="h-32 sm:h-40 w-full object-cover"
                />
              ) : (
                <div className="h-32 sm:h-40 flex items-center justify-center bg-gray-100">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}

              <div className="p-3 flex flex-col flex-grow">
                <h3
                  onClick={() => p._id && router.push(`/admin/products/${p._id}`)}
                  className="text-sm sm:text-base font-semibold text-cyan-900 cursor-pointer hover:underline truncate"
                >
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500">{p.category}</p>

                <p className="mt-1 text-cyan-900 font-bold text-sm sm:text-base">
                  ₦{(typeof p.price === "number" ? p.price : 0).toLocaleString()}
                </p>

                <div className="flex justify-between items-center mt-1 text-xs sm:text-sm">
                  <span className="text-gray-600">Stock: {p.stock}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(p._id || null);
                      setForm({
                        name: p.name || "",
                        price: (p.price as number) || 0,
                        category: (p as any).category || "",
                        stock: (p as any).stock || 0,
                        status: ((p as any).status as "Active" | "Inactive") || "Active",
                        imageUrl: p.imageUrl || "",
                      });
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition text-xs sm:text-sm"
                  >
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => p._id && handleDelete(p._id)}
                    className="flex-1 flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition text-xs sm:text-sm"
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
