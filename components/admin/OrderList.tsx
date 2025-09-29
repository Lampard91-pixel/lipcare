"use client";
import React from "react";

export default function OrderList({ order }: { order: any }) {
  return (
    <div className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
          {order.customer.split(" ").map((n: string) => n[0]).slice(0,2).join("")}
        </div>
        <div>
          <div className="font-medium">{order.customer}</div>
          <div className="text-xs text-gray-400">#{order.id} • {order.date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">₦{order.amount.toLocaleString()}</div>
        <div className="text-xs flex items-center gap-2 justify-end mt-1">
          <span className={`text-xs ${order.paid ? "text-green-600" : "text-red-500"}`}>{order.paid ? "Paid" : "Unpaid"}</span>
          <span className="text-xs text-orange-500">{order.fulfilled ? "Fulfilled" : "Unfulfilled"}</span>
        </div>
      </div>
    </div>
  );
}
