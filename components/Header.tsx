"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderWithBanner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[80vh]">
      {/* 🔥 Thin Ribbon */}
      <div className="fixed top-0 left-0 w-full bg-cyan-900 text-white h-6 flex items-center overflow-hidden z-50">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="whitespace-nowrap text-center font-medium text-xs sm:text-sm"
        >
          🌸 Free Delivery on Orders Over ₦15,000 • Lipcrush – Shine Brighter
          with Every Shade • Confidence in Every Swipe • Hydrating Colors for
          Every Skin Tone • Long-Lasting, Bold & Smooth Finish • Glow, Hydrate &
          Love Your Lips • Shop Exclusive Limited-Time Shades • Be Bold. Be
          Beautiful. Be Lipcrush. •
        </motion.div>
      </div>

      {/* 🎥 Banner Video */}
      <div className="absolute inset-0">
        <video
          src="/lip.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-[24px] left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 ${
            isScrolled ? "py-3" : "py-4"
          } transition-all duration-300`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Lipcrush Logo"
              width={36}
              height={36}
              className="rounded-full shadow-sm"
            />
            <span
              className={`font-bold transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              } text-xl`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Lipcrush
            </span>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5 transition-colors duration-300">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Search
                className="cursor-pointer hover:opacity-80"
                size={22}
                strokeWidth={1}
                color={isScrolled ? "gray" : "white"}
              />
            </button>
            <ShoppingCart
              className="cursor-pointer hover:opacity-80"
              size={22}
              strokeWidth={1}
              color={isScrolled ? "gray" : "white"}
            />
            <button onClick={() => setMenuOpen(true)}>
              <Menu
                className="cursor-pointer hover:opacity-80"
                size={24}
                strokeWidth={1}
                color={isScrolled ? "gray" : "white"}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Banner Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
        <h1
          className="text-white text-3xl md:text-4xl font-bold max-w-lg leading-snug"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Shine Brighter with Every Shade ✨
        </h1>
        <p className="text-white text-sm md:text-base mt-2 max-w-sm leading-relaxed">
          Discover lip shades designed to hydrate, glow, and empower you.  
          Your perfect shade, redefined by Lipcrush.
        </p>
        <button className="mt-4 bg-white text-black px-4 py-1.5 rounded-full text-xs font-normal shadow-sm hover:opacity-90 transition">
          Shop All!
        </button>
      </div>

      {/* 🔥 Bigger Bottom Ribbon */}
      <div className="absolute bottom-0 left-0 w-full bg-cyan-900 text-white h-12 flex items-center overflow-hidden z-20">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="whitespace-nowrap text-center font-semibold text-base"
        >
          💄 Bold Colors • Smooth Finish • Kiss-Ready Lips • Exclusive Lipcrush
          Shades • Beauty That Lasts All Day • Glow On-The-Go • Luxe Texture,
          Everyday Wear • Shop Lipcrush Today 💋 •
        </motion.div>
      </div>

      {/* 🚀 Right-Side Drawer Menu with Blur */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 w-72 sm:w-80 h-full bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Top Section with Logo & Close */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo.jpeg"
                    alt="Lipcrush Logo"
                    width={40}
                    height={40}
                    className="rounded-full shadow-sm"
                  />
                  <span
                    className="text-black font-bold text-lg"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Lipcrush
                  </span>
                </div>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={26} className="text-black" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col space-y-6 text-black text-lg px-8 mt-8">
                <a href="#" className="hover:text-pink-500 transition">
                  Shop All
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  Home
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  Our Story
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  Contact
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  Reviews
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  Rewards!
                </a>
              </nav>

              {/* Footer Links in Menu */}
              <div className="mt-auto px-8 pb-10 text-sm text-gray-600 space-y-2">
                <a href="#" className="block hover:text-pink-500">
                  Log in
                </a>
                <a href="#" className="block hover:text-pink-500">
                  Search
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
