"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Settings, ShoppingCart, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminBottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/home", label: "Home", icon: Home },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white flex justify-around items-center h-16 shadow-lg md:hidden border-t border-slate-700">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;

        return (
          <Link key={tab.href} href={tab.href} className="relative flex flex-col items-center justify-center w-full h-full text-sm">
            {isActive && (
              <motion.div
                layoutId="admin-active-pill"
                className="absolute inset-0 bg-slate-700/50"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center">
              <Icon
                className={`h-5 w-5 mb-1 ${
                  isActive ? "text-cyan-400" : "text-slate-400"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={isActive ? "text-white font-semibold" : "text-slate-400"}>
                {tab.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}