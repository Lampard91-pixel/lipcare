"use client";
import React from "react";

export default function OrdersHeader({
  query,
  setQuery,
  filter,
  setFilter,
}: {
  query: string;
  setQuery: (v: string) => void;
  filter: string;
  setFilter: (v: any) => void;
}) {
  return (
    <header>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center">+</button>
          <button className="w-9 h-9 rounded-full bg-white border text-gray-700">☰</button>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders"
          className="w-full px-3 py-2 rounded-lg border bg-white"
        />
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto">
        {[
          { key: "paid", label: "Paid" },
          { key: "unpaid", label: "Unpaid" },
          { key: "pending", label: "Pending" },
          { key: "all", label: "All" },
        ].map((t) => {
          const active = filter === (t.key as string);
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3 py-1 rounded-full text-sm ${active ? "bg-green-600 text-white" : "bg-white border text-gray-700"}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Showing orders ({filter})
      </div>
    </header>
  );
}
