"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useCart } from "@/app/contexts/CartContext";
import { getProducts } from "@/lib/api/products";

type Product = {
  _id: string;
  id?: string; // compatibility
  name: string;
  price: number;
  imageUrl: string;
  image?: string;
  category: string;
};

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

// tiny transparent gif for blur effect
const shimmer =
  `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`;

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        setProducts(allProducts.slice(0, 4)); // take first 4
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Products
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg leading-6 sm:leading-8 text-gray-600">
            Our most loved, must-have essentials for perfect lips.
          </p>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-gray-500 mt-12">
            Loading featured products...
          </div>
        ) : (
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                className="group relative text-center"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out filter brightness-105 saturate-110 group-hover:scale-105 group-hover:brightness-115"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    priority={i < 2}
                    placeholder="blur"
                    blurDataURL={shimmer}
                  />
                </div>

                {/* Product Info */}
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-gray-900">
                  <Link href={`/shop/${product._id}`}>{product.name}</Link>
                </h3>
                <p className="mt-1 text-base sm:text-lg font-medium text-gray-800">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Add to Cart */}
                <div className="mt-2">
                  <button
                    onClick={() =>
                      addItem({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.imageUrl || "",
                      })
                    }
                    className="text-xs sm:text-sm font-medium text-cyan-800 hover:text-cyan-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
