"use client";

import Image from "next/image";

const testimonials = [
  {
    body: "Absolutely in love with the Cherry Pop gloss! It’s not sticky at all and gives the perfect shine. My new favorite!",
    author: {
      name: "Aisha Bello",
      handle: "aishab",
      imageUrl: "https://i.pravatar.cc/48?u=aisha",
    },
  },
  {
    body: "The Sugar Kiss scrub has transformed my lips. They’ve never been so soft and smooth. I use it twice a week and the results are amazing.",
    author: {
      name: "Chioma Nwosu",
      handle: "chioman",
      imageUrl: "https://i.pravatar.cc/48?u=chioma",
    },
  },
  {
    body: "Finally, a lip balm that actually works! The Vanilla Kiss balm keeps my lips hydrated all day long. Highly recommend!",
    author: {
      name: "Fatima Aliyu",
      handle: "fatimaa",
      imageUrl: "https://i.pravatar.cc/48?u=fatima",
    },
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials row */}
        <div className="mt-10 flex justify-center gap-3 sm:gap-6 scale-90 sm:scale-95 md:scale-100">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author.handle}
              className="flex-1 max-w-[110px] sm:max-w-[180px] md:max-w-[240px] rounded-xl bg-cyan-50/60 p-4 sm:p-6 shadow-sm"
            >
              <p className="text-[11px] sm:text-sm leading-snug text-gray-700">
                “{testimonial.body}”
              </p>
              <div className="mt-3 flex items-center gap-x-2">
                <Image
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-50"
                  src={testimonial.author.imageUrl}
                  alt={testimonial.author.name}
                  width={40}
                  height={40}
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    @{testimonial.author.handle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
