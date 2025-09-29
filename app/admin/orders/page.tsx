"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getOrders, addOrder, type Order } from "@/lib/api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"All" | "Paid" | "Unpaid" | "Pending">(
    "All"
  );
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<Order["status"]>("Pending");

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const statusColors: Record<Order["status"], string> = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  // Handle form submit
  const handleAddOrder = async () => {
    if (!customer || !date || !price) return alert("Fill all fields");

    const newOrder = {
      customer,
      date,
      price,
      status,
    };

    await addOrder(newOrder);
    setOrders(await getOrders()); // refresh orders
    setShowModal(false);

    // Reset form
    setCustomer("");
    setDate("");
    setPrice(0);
    setStatus("Pending");
  };

  return (
    <div className="p-4 space-y-4 relative">
      <h1 className="text-lg font-bold">Orders</h1>

      {/* Filter Tabs */}
      <div className="flex border-b bg-gray-50 rounded-lg overflow-hidden">
        {(["All", "Paid", "Unpaid", "Pending"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-2 text-sm ${
              filter === tab
                ? "bg-cyan-900 text-white font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order._id || order.id}
            className="flex justify-between items-center border rounded-lg p-4 bg-white shadow-sm"
          >
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-xs text-gray-500">
                #{order._id || order.id} • {order.date}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="font-semibold">₦{order.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 bg-cyan-900 text-white p-4 rounded-full shadow-lg"
      >
        <Plus size={20} />
      </button>

      {/* Add Order Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Add New Order</h2>

            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full border rounded p-2"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border rounded p-2"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Order["status"])}
              className="w-full border rounded p-2"
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-cyan-900 text-white rounded"
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
