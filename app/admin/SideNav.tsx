"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Users, Settings } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-slate-900 text-white">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <Image src="/logo.jpeg" alt="Logo" width={32} height={32} className="rounded-full" />
        <h2 className="text-xl font-semibold">Lipcrush Admin</h2>
      </div>
      <nav className="flex-1 px-4 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`flex items-center px-4 py-2.5 my-1 rounded-lg transition-colors ${isActive ? "bg-slate-700 text-white font-semibold" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
              <Icon className="h-5 w-5 mr-3" strokeWidth={1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}