"use client";

import useSWR from 'swr';
import { ShoppingCart, Users, Box, DollarSign, LucideIcon } from 'lucide-react';
import { Product } from '@/lib/api/products';
import { Order } from '@/lib/api/orders';
import { Customer } from '@/lib/api/customers';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function StatCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm animate-pulse">
      <div className="p-3 rounded-full bg-gray-200 h-12 w-12"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: products, isLoading: productsLoading } = useSWR<Product[]>('/api/products', fetcher);
  const { data: orders, isLoading: ordersLoading } = useSWR<Order[]>('/api/orders', fetcher);
  const { data: customers, isLoading: customersLoading } = useSWR<Customer[]>('/api/customers', fetcher);

  const isLoading = productsLoading || ordersLoading || customersLoading;
  const revenue = orders?.reduce((sum, o) => sum + (o.price || 0), 0) ?? 0;

  const stats = [
    { title: "Revenue", value: `₦${revenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-100 text-green-600", loading: ordersLoading },
    { title: "Total Orders", value: orders?.length ?? 0, icon: ShoppingCart, color: "bg-blue-100 text-blue-600", loading: ordersLoading },
    { title: "Customers", value: customers?.length ?? 0, icon: Users, color: "bg-purple-100 text-purple-600", loading: customersLoading },
    { title: "Products", value: products?.length ?? 0, icon: Box, color: "bg-orange-100 text-orange-600", loading: productsLoading },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) =>
          stat.loading ? (
            <StatCardSkeleton key={stat.title} />
          ) : (
            <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          )
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: LucideIcon, color: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-gray-900 text-lg">{value}</p>
      </div>
    </div>
  );
}
