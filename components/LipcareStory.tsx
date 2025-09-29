"use client";

import Image from "next/image";

export default function LipcareStory() {
  return (
    <section className="bg-cyan-50/50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700">Our Story</h3>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-cyan-900">
              Crafted with Love, Inspired by Nature
            </h2>
            <p className="mt-4 text-gray-600">
              It all started with a simple belief: what we put on our lips should be as pure and wholesome as the food we eat. Frustrated by products filled with harsh chemicals, we embarked on a journey to create a line of lip care that was both effective and genuinely natural.
            </p>
            <p className="mt-3 text-gray-600">
              Each balm, scrub, and gloss is handcrafted in small batches, using only the finest locally-sourced ingredients. We&apos;re passionate about creating products that not only make you look good but feel good, too.
            </p>
            <button className="mt-6 px-5 py-2.5 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition text-sm font-medium">
              Discover Our Ingredients
            </button>
          </div>
          <div className="order-1 md:order-2">
            <Image src="https://images.unsplash.com/photo-1590431306482-f700ee050c59?q=80&w=1887&auto=format&fit=crop" alt="Natural lip care ingredients" width={500} height={500} className="rounded-lg shadow-lg object-cover aspect-square" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}