"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";

// ⌨️ Typing Animation Component
function AnimatedTagline() {
  const messages = useMemo(
    () => [
      "Keep your lips soft and supple every day.",
      "Say goodbye to dryness, hello to hydration.",
      "Glow starts with nourished, healthy lips.",
      "Pamper your pout with gentle lip care.",
      "Beautiful lips begin with lasting moisture.",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < messages[index].length) {
      timeout = setTimeout(() => {
        setDisplayedText(messages[index].slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(messages[index].slice(0, displayedText.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === messages[index].length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % messages.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index, messages]);

  return (
    <div className="text-center mt-4 h-8">
      <p className="text-lg md:text-xl font-serif text-[#0f3c4c] font-semibold tracking-wide">
        {displayedText}
        <span className="text-orange-500 animate-pulse">|</span>
      </p>
    </div>
  );
}

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const media = [
    { type: "image", src: "/fir1.jpeg" },
    { type: "video", src: "/hero-video.mp4" },
    { type: "image", src: "/fir2.jpeg" },
    { type: "image", src: "/fir3.jpeg" },
    { type: "image", src: "/fir4.jpeg" },
  ];

  const testimonialVideos = ["/tiktok1.mp4", "/tiktok2.mp4", "/tiktok3.mp4"];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  return (
    <main className="w-full bg-gray-100 py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Heading */}
        <div className="text-center my-12">
          <p className="text-sm tracking-widest uppercase text-gray-700">
            Gentle, Nourishing, Sustainable
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-[#0f3c4c]">
            The Original &quot;Lip Crush Care&quot;
          </h1>
        </div>

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {/* Main Preview */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {media[currentIndex].type === "video" ? (
                <video
                  src={media[currentIndex].src}
                  controls autoPlay loop muted
                  className="rounded-xl w-[360px] h-[520px] object-cover shadow-md cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
              ) : (
                <Image
                  src={media[currentIndex].src}
                  alt="Product media"
                  width={360}
                  height={520}
                  className="rounded-xl w-[360px] h-[520px] object-cover shadow-md cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
              )}

              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3">
              {media.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    currentIndex === idx ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  {item.type === "video" ? (
                    <video src={item.src} className="w-16 h-16 object-cover" muted />
                  ) : (
                    <Image
                      src={item.src}
                      alt={`thumb-${idx}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#0f3c4c]">
              Soothing Hydration Lip Care
            </h2>
            <p className="mt-3 text-gray-600 font-light leading-relaxed">
              Hydrates, nourishes, and repairs dry, chapped lips. A gentle formula
              with natural oils and vitamins for long-lasting comfort and a healthy glow.
            </p>

            {/* Price */}
            <p className="mt-5 text-2xl font-semibold text-[#0f3c4c]">$14.99</p>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label htmlFor="qty" className="text-sm font-medium block mb-1">
                Quantity
              </label>
              <div className="flex items-center border border-[#0f3c4c] rounded-full w-28 px-4 py-2 justify-between">
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="ml-2 text-[#0f3c4c]"
                >
                  <ChevronDown className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="ml-1 text-[#0f3c4c]"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="mt-6 w-full bg-[#0f3c4c] text-white py-2 rounded-full font-medium hover:bg-[#0c2d39] transition">
              Add to Cart
            </button>

            {/* Testimonial Videos */}
            <div className="mt-10">
              <div className="grid grid-cols-3 gap-4">
                {testimonialVideos.map((video, idx) => (
                  <video
                    key={idx}
                    src={video}
                    controls
                    className="rounded-xl w-full h-[260px] object-cover shadow"
                  />
                ))}
              </div>

              {/* Safe Badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✔</span>
                  <p>Paraben-Free</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✔</span>
                  <p>Cruelty-Free</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✔</span>
                  <p>Fragrance-Free</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✔</span>
                  <p>Dermatologist Tested</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>
            {media[currentIndex].type === "image" ? (
              <Image
                src={media[currentIndex].src}
                alt="Large preview"
                width={1000}
                height={1000}
                className="rounded-xl max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={media[currentIndex].src}
                controls autoPlay loop muted
                className="rounded-xl max-h-[90vh]"
              />
            )}
          </div>
        )}

        {/* ✅ Featured Section (with animated tagline + logo fade-in) */}
        <section className="mt-20 text-center">
          <AnimatedTagline />

          <motion.div
            className="flex justify-center items-center gap-8 mt-6 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src="/BOSTON.avif" alt="Boston Logo" width={60} height={60} />
            <Image src="/ABC.avif" alt="NBC Logo" width={60} height={60} />
            <Image src="/NBC.avif" alt="ABC Logo" width={60} height={60} />
            <Image src="/THE.webp" alt="Derm Review Logo" width={120} height={40} />
          </motion.div>

          <motion.button
            className="mt-8 px-6 py-2 bg-[#0f3c4c] text-white rounded-full hover:bg-[#0c2d39]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Shop All
          </motion.button>
        </section>
      </div>
    </main>
  );
}
