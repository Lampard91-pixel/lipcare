"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, LogOut, ChevronRight } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pathname.startsWith("/admin/products")
    ? "Products"
    : pathname.startsWith("/admin/orders")
    ? "Orders"
    : pathname.startsWith("/admin/customers")
    ? "Customers"
    : pathname.startsWith("/admin/home")
    ? "Dashboard"
    : "Admin";

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(1); // drop leading 'admin'
  const crumbs = ["admin", ...segments];

  return (
    <header className="sticky top-0 z-40 bg-cyan-900 text-white">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Boxes className="h-5 w-5" />
          <span>Admin • {title}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-white/70">
          {crumbs.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={i === crumbs.length - 1 ? "text-white font-medium" : ""}>{c}</span>
              {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-70" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            Go to Store
          </Link>
          <button className="inline-flex items-center gap-1 rounded-md border border-white/30 px-2 py-1 text-sm text-white hover:bg-cyan-800">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
