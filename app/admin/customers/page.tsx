"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getCustomers, addCustomer, type Customer } from "@/lib/api/customers";

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-cyan-900 text-white flex items-center justify-center">
      {name[0]}
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    (async () => setCustomers(await getCustomers()))();
  }, []);

  const handleAdd = async () => {
    if (!name || !email) return;
    await addCustomer({ name, email, orders });
    setCustomers(await getCustomers());
    setShowModal(false);
    setName("");
    setEmail("");
    setOrders(0);
  };

  return (
    <div className="p-4 space-y-4 relative">
      <h1 className="text-lg font-bold">Customers</h1>

      <div className="space-y-3">
        {customers.map((c) => (
          <div
            key={c._id || c.email}
            className="flex justify-between items-center border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar name={c.name} />
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-gray-500">{c.email}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {c.orders} Orders
            </p>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button onClick={() => setShowModal(true)} className="fixed bottom-20 right-4 bg-cyan-900 text-white p-4 rounded-full shadow-lg">
        <Plus size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Add Customer</h2>
            <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full border rounded p-2" type="number" placeholder="Orders" value={orders} onChange={(e) => setOrders(Math.max(0, Number(e.target.value) || 0))} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-cyan-900 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
