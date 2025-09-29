"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, Sun } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Exfoliate & Renew",
    description:
      "Start with our Sugar Kiss Lip Scrub to gently buff away dry skin, creating a smooth canvas.",
    icon: Sparkles,
  },
  {
    step: 2,
    title: "Hydrate & Nourish",
    description:
      "Apply a layer of our Vanilla Kiss Lip Balm to deeply moisturize and condition your lips.",
    icon: Droplets,
  },
  {
    step: 3,
    title: "Gloss & Protect",
    description:
      "Finish with a swipe of Cherry Pop Lip Gloss for a beautiful shine and an extra layer of protection.",
    icon: Sun,
  },
];

export default function LipCareRoutine() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your 3-Step Lip Ritual
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Unlock your softest, healthiest lips in minutes.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Timeline line (desktop only) */}
          <div
            className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 hidden md:block"
            aria-hidden="true"
          ></div>

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="relative flex flex-col items-center text-center md:grid md:grid-cols-2 md:gap-x-8 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`flex flex-col items-center md:flex-row md:items-center gap-4 ${
                  index % 2 === 0
                    ? "md:col-start-1"
                    : "md:col-start-2 md:text-right"
                }`}
              >
                {/* Step number */}
                <div
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold ${
                    index % 2 !== 0 && "md:order-2"
                  }`}
                >
                  {item.step}
                </div>

                {/* Step text */}
                <div className={`${index % 2 !== 0 && "md:order-1"}`}>
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
