"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function IngredientSpotlight() {
  return (
    <section className="bg-pink-50/40 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Image */}
          <div className="relative aspect-square w-full max-w-md mx-auto md:max-w-none">
            <Image
              src="/pexel.jpg"
              alt="Shea Butter"
              fill
              className="rounded-2xl shadow-lg object-cover"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Text content */}
          <div className="text-center md:text-left">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pink-600">
              Ingredient Spotlight
            </h3>
            <h2
              className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pure Shea Butter
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Known as &quot;Mother Nature&apos;s conditioner,&quot; Shea Butter
              is a miracle ingredient for lips. Rich in vitamins A, E, and F, it
              provides intense moisture, soothes irritation, and helps protect
              your lips&apos; natural oils. We source ours from fair-trade
              cooperatives to ensure the highest quality and ethical standards.
            </p>
            <button className="mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-cyan-900 text-white rounded-full hover:bg-cyan-800 transition-colors font-medium shadow-md text-sm sm:text-base">
              Learn More About Our Ingredients
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
