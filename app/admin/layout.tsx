"use client";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import SideNav from "./SideNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
      <AdminBottomNav /> 
    </div>
  );
}