"use client";

import { Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-pink-700 text-white overflow-hidden">
      {/* 🌊 Animated Waves with Soft Fade */}
      <div className="absolute -top-24 left-0 w-full overflow-hidden leading-none rotate-180 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]">
        <svg
          className="relative block w-[200%] h-32 animate-wave-slow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 V120 H0 Z"
            fill="currentColor"
            className="text-pink-700 opacity-40"
          />
        </svg>
        <svg
          className="relative block w-[200%] h-32 -mt-8 animate-wave-medium"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C200,120 400,0 600,50 C800,100 1000,0 1200,50 V120 H0 Z"
            fill="currentColor"
            className="text-pink-700 opacity-60"
          />
        </svg>
        <svg
          className="relative block w-[200%] h-32 -mt-10 animate-wave-fast"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,70 C250,130 450,20 700,70 C950,120 1150,10 1200,70 V120 H0 Z"
            fill="currentColor"
            className="text-pink-700 opacity-80"
          />
        </svg>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1 - Brand Note */}
        <div>
          <h2 className="text-xl font-semibold mb-4">We’re here to help!</h2>
          <p className="text-sm leading-relaxed text-pink-100">
            Wherever you’re at in your journey, please know that you’re not
            alone. We’ve been through it and are here to help, in whatever way
            we can. Don’t hesitate to reach out :)
          </p>
          <p className="text-sm mt-4 italic text-pink-200">– Lipcrush Team</p>
        </div>

        {/* Column 2 - Shop */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shop</h2>
          <ul className="space-y-2 text-sm text-pink-100">
            <li><Link href="#">Shop</Link></li>
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">Our Story</Link></li>
            <li><Link href="#">Reviews</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Info</h2>
          <ul className="space-y-2 text-sm text-pink-100">
            <li><Link href="#">Store Locator</Link></li>
            <li><Link href="#">Media Resources</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Return Policy</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Wholesale</Link></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Drop us a line!</h2>
          <p className="text-sm mb-4 text-pink-100">
            Get Exclusive Discounts, Drops & More!
          </p>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 text-sm outline-none text-white placeholder-pink-200 bg-transparent"
            />
            <button className="px-6 py-3 bg-white text-pink-700 text-sm font-medium hover:bg-gray-200 transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Lipcrush Logo"
              width={40}
              height={40}
              className="rounded-full shadow-sm"
            />
            <span
              className="font-bold text-white text-2xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Lipcrush
            </span>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition transform hover:scale-110 shadow-md"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition transform hover:scale-110 shadow-md"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition transform hover:scale-110 shadow-md"
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-pink-200 text-center">
            © {new Date().getFullYear()} Lipcrush. All rights reserved.
          </p>
        </div>
      </div>

      {/* Wave Animation Styles */}
      <style jsx>{`
        .animate-wave-slow {
          animation: wave 18s ease-in-out infinite alternate;
        }
        .animate-wave-medium {
          animation: wave 12s ease-in-out infinite alternate;
        }
        .animate-wave-fast {
          animation: wave 8s ease-in-out infinite alternate;
        }
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </footer>
  );
}
