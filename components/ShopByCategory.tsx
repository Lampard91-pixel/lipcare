"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const categories = [
  { name: "Lip Balms", href: "/shop/balms", image: "/fir1.jpeg" },
  { name: "Lip Glosses", href: "/shop/glosses", image: "/fir2.jpeg" },
  { name: "Lip Scrubs", href: "/shop/scrubs", image: "/fir3.jpeg" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ShopByCategory() {
  return (
    <div className="bg-white py-10 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shop by Category
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-7 text-gray-600">
            Find the perfect product for your needs.
          </p>
        </div>

        {/* Categories row */}
        <div className="flex justify-center gap-3 sm:gap-4 scale-90 sm:scale-95 md:scale-100">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 max-w-[120px] sm:max-w-[160px] md:max-w-[200px]"
            >
              <Link href={category.href} className="group block">
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-lg shadow-md bg-gray-100 transition-all duration-300 group-hover:shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-2 left-2 text-xs sm:text-sm md:text-base font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
