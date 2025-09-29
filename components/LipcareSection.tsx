"use client";

import { Droplets, Leaf, Sun, Sparkles } from "lucide-react";

const features = [
  {
    name: "Deep Hydration",
    description: "Our formulas are packed with moisturizing ingredients to keep your lips soft and supple all day long.",
    icon: Droplets,
  },
  {
    name: "Natural Ingredients",
    description: "We use only the finest, ethically-sourced natural ingredients. No harsh chemicals, ever.",
    icon: Leaf,
  },
  {
    name: "Sun Protection",
    description: "Select products contain natural SPF to protect your delicate lips from harmful UV rays.",
    icon: Sun,
  },
  {
    name: "Beautiful Shine",
    description: "Achieve the perfect glossy finish without the stickiness. For a look that feels as good as it looks.",
    icon: Sparkles,
  },
];

export default function LipcareSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-900">The Essentials of Lip Care</h2>
          <p className="mt-2 text-base text-gray-600">Everything your lips need to stay healthy and beautiful.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-900 mx-auto">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}