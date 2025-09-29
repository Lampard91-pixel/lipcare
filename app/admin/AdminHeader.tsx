"use client";

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';
import Image from 'next/image';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
];

export default function AdminHeader() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image src="/logo.jpeg" alt="Lipcrush Logo" width={32} height={32} className="rounded-full" />
              <span className="font-semibold text-lg">Lipcrush Admin</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {adminNavItems.map(item => (
              <Link key={item.href} href={item.href} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                <item.icon className="inline-block w-4 h-4 mr-1.5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}