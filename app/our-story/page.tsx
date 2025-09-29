"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function OurStoryPage() {
  return (
    <div className="bg-pink-50 min-h-screen py-20 sm:py-32">
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/pexel.jpg"
            alt="Founder of Lipcrush"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div variants={containerVariants}>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-cyan-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our Story
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-700 leading-relaxed">
            Lipcrush was born from a simple idea: to create lip care that not only looks beautiful but feels incredible. We believe in the power of natural ingredients and the confidence that comes from a perfect pout.
          </motion.p>
          <motion.p variants={itemVariants} className="mt-4 text-gray-600 leading-relaxed">
            Our journey started in a small kitchen, experimenting with nourishing oils and rich pigments. We wanted to craft products that were kind to your lips and the planet. Every shade is a testament to our passion for quality, color, and self-expression.
          </motion.p>
          <motion.p variants={itemVariants} className="mt-4 text-gray-600 leading-relaxed">
            Today, Lipcrush is more than just a brand; it&apos;s a community of beauty lovers who aren&apos;t afraid to shine. We invite you to explore our collection and find the color that tells your story.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}