"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    status: "Active" as "Active" | "Inactive",
    imageUrl: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setForm({
          name: data.name || "",
          price: data.price || 0,
          category: data.category || "",
          stock: data.stock || 0,
          status: (data.status as "Active" | "Inactive") || "Active",
          imageUrl: data.imageUrl || "",
        });
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      let payload = { ...form } as any; // keep imageUrl as provided
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update product");
      router.push("/admin/products");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-cyan-900 mb-4">Edit Product</h1>
      <form onSubmit={handleSave} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock quantity"
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
            className="block w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-900"
          />
          {form.imageUrl && (
            <Image src={form.imageUrl} alt="Preview" width={400} height={250} className="mt-2 h-40 w-full object-cover rounded-lg border" />
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-2 rounded-lg bg-cyan-900 text-white hover:bg-cyan-800 text-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}


