"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/pexel.jpg" // 🔹 Replace with your lipcare banner image
        alt="Lipcare Hero Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          Nourish & Protect Your Lips
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white drop-shadow">
          Lipcare formulated for hydration, softness, and all-day protection
        </p>

        <Link
          href="/shop"
          className="inline-block mt-8 bg-white text-[#0f3c4c] font-medium px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
