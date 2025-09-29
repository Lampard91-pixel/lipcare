"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  const slide = {
    src: "/banner.jpeg",
    heading: "Pure Radiance, Naturally.",
    text: "Experience lip care that's as kind to the planet as it is to your skin.",
  };

  return (
    <section className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Ken Burns Effect Background */}
      <motion.div
        className="absolute inset-0"
        key={slide.src}
        initial={{ scale: 1 }}
        animate={{
          scale: 1.1,
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      >
        <Image
          src={slide.src}
          alt="Hero Banner"
          fill
          priority
          className="object-cover filter brightness-110 saturate-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Animated Text Content */}
      <div className="relative z-10 text-center px-3 sm:px-4 max-w-lg sm:max-w-2xl">
        <motion.h1
          key={slide.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.9 }}
          className="text-white text-2xl sm:text-3xl md:text-6xl font-bold drop-shadow-xl leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {slide.heading.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          key={slide.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl text-white font-medium tracking-wide"
        >
          {slide.text}
        </motion.p>

        <Link
          href="/shop"
          className="inline-block mt-6 sm:mt-8 bg-white text-cyan-900 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
