"use client";

import { Leaf, Heart, Sparkles, Droplets } from "lucide-react";

const features = [
  {
    name: "Natural Ingredients",
    description:
      "We use only the finest, ethically-sourced natural ingredients for gentle and effective lip care.",
    icon: Leaf,
  },
  {
    name: "Cruelty-Free",
    description:
      "Our products are never tested on animals. We believe in beauty without compromise.",
    icon: Heart,
  },
  {
    name: "Deep Hydration",
    description:
      "Formulated to provide long-lasting moisture, leaving your lips soft, smooth, and healthy.",
    icon: Droplets,
  },
  {
    name: "Handcrafted with Love",
    description:
      "Every product is made in small batches with meticulous attention to detail and quality.",
    icon: Sparkles,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-cyan-900 text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Why Lipcrush?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-cyan-200">
            Experience the difference of pure, thoughtful lip care.
          </p>
        </div>

        {/* Features row */}
        <div className="mt-10 flex justify-center gap-3 sm:gap-6 scale-90 sm:scale-95 md:scale-100">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex-1 max-w-[85px] sm:max-w-[140px] md:max-w-[180px] text-center"
            >
              {/* Icon */}
              <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </div>
              {/* Title */}
              <h3 className="mt-3 text-xs sm:text-sm font-semibold">
                {feature.name}
              </h3>
              {/* Description */}
              <p className="mt-1 text-[11px] sm:text-xs text-cyan-200 leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
