"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  { id: 1, src: "/fir1.jpeg", alt: "Lip balm on a beach" },
  { id: 2, src: "/fir2.jpeg", alt: "Close up of glossy lips" },
  { id: 3, src: "/fir3.jpeg", alt: "Lip scrub texture shot" },
  { id: 4, src: "/pexel.jpg", alt: "Model applying lipstick" },
  { id: 5, src: "/fir1.jpeg", alt: "Flatlay of lip care products" },
];

export default function SocialFeed() {
  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            #LipcrushLove
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Join our community and share your glow. Follow us on Instagram!
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href="#"
              className="group relative block aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href="#"
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-medium shadow-md text-sm sm:text-base"
          >
            Follow @Lipcrush
          </a>
        </div>
      </div>
    </section>
  );
}
