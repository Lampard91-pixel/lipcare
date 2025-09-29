"use client";

import { motion } from "framer-motion";

export default function ProductDetailSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-cyan-900" style={{ fontFamily: 'var(--font-playfair)' }}>Discover Our Signature Collection</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of nature and science. Our products are designed to nourish, protect, and beautify your lips.</p>
        </motion.div>
      </div>
    </section>
  );
}