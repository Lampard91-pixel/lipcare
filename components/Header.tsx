"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, Home, ShoppingBag, BookHeart, Mail, Star, Gift, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useCart } from "@/app/contexts/CartContext";

const drawerNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop All", icon: ShoppingBag },
  { href: "/our-story", label: "Our Story", icon: BookHeart },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/rewards", label: "Rewards!", icon: Gift },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn } = useUser();
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🔥 Top Thin Ribbon */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full bg-cyan-900 text-white h-6 flex items-center overflow-hidden z-50"
          >
            <motion.div
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="whitespace-nowrap text-center font-medium text-xs sm:text-sm"
            >
              🌸 Free Delivery on Orders Over ₦15,000 • Lipcrush – Shine Brighter with Every Shade • Hydrating Colors • Bold, Smooth Finish • Shop Exclusive Limited-Time Shades •
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "top-0 bg-white shadow-md" : "top-6 bg-white/80 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div
          className={`flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-4"
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.jpeg" alt="Lipcrush Logo" width={36} height={36} className="rounded-full shadow-sm" />
              <span className="font-bold text-cyan-900 text-lg sm:text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                Lipcrush
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {drawerNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative z-10 ${
                      isActive ? "text-white" : "text-gray-600 hover:text-cyan-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-cyan-900 rounded-md z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center justify-end gap-2">
            {/* Desktop */}
            <div className="hidden md:flex items-center lg:space-x-1">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="text-gray-600" size={22} strokeWidth={1.5} />
              </button>
              <div className="relative">
                <button onClick={() => setCartOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="text-gray-600" size={22} strokeWidth={1.5} />
                </button>
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0, y: -10, x: 10 }}
                      animate={{ scale: 1, y: 0, x: 0 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      {cartItemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <User className="text-gray-600" size={22} strokeWidth={1.5} />
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-1 md:hidden">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="text-gray-600" size={22} strokeWidth={1.5} />
              </button>
              <button onClick={() => setCartOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <ShoppingCart className="text-gray-600" size={22} strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </button>
              <button onClick={() => setMenuOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Menu className="text-gray-600" size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* 🚀 Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full sm:w-80 h-full bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Image src="/logo.jpeg" alt="Lipcrush Logo" width={40} height={40} className="rounded-full shadow-sm" />
                  <span className="text-black font-bold text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                    Lipcrush
                  </span>
                </div>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={26} className="text-black" />
                </button>
              </div>

              {/* Drawer Nav */}
              <nav className="flex flex-col space-y-4 sm:space-y-6 text-black text-base sm:text-lg px-6 sm:px-8 mt-6 flex-grow">
                {drawerNavItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition">
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom */}
              <div className="px-6 sm:px-8 pb-8 text-sm text-gray-600 space-y-2">
                <button onClick={() => { setMenuOpen(false); setSearchOpen(true); }} className="block hover:text-pink-500">
                  Search
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔍 Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white w-full max-w-lg rounded-lg shadow-xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-4 border rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-cyan-900"
                  autoFocus
                />
              </div>
              <div className="mt-4 text-center text-gray-500 text-sm sm:text-base">
                {searchQuery ? `Searching for "${searchQuery}"...` : "Start typing to find your favorite lip care."}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
