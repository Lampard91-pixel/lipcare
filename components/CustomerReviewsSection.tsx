"use client";

import Image from "next/image";

export default function CustomerReviewSection() {
  const testimonials = [
    {
      name: "Amira, Student",
      image: "/tes1.jpg",
      quote:
        "My lips used to get dry and cracked every winter. I tried so many balms, but nothing worked. After switching to this lipcare, my lips stay soft and smooth all day – even in harmattan season!",
    },
    {
      name: "Sara, Makeup Enthusiast",
      image: "/tes2.jpg",
      quote:
        "This lip balm is my holy grail! It keeps my lips hydrated without feeling sticky, so my lipstick goes on perfectly. I finally found a lip product that I can’t live without!",
    },
    {
      name: "Kathy & Patrick, Newlyweds",
      image: "/tes3.jpg",
      quote:
        "We both struggled with dry, chapped lips. Now, with this lipcare, our lips stay moisturized and kissably soft all day. It’s a must-have in our daily routine!",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      {/* Heading */}
      <h2 className="text-center text-5xl font-serif font-bold text-[#0f3c4c] mb-16">
        Loved by Real People
      </h2>

      {/* Testimonials */}
      <div className="flex justify-center gap-4 flex-wrap">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center max-w-[280px]"
          >
            <Image
              src={t.image}
              alt={t.name}
              width={260}
              height={260}
              className="rounded-lg object-cover w-[260px] h-[260px]"
            />
            <h3 className="mt-3 font-semibold text-lg">{t.name}</h3>
            <p className="mt-2 text-gray-600 italic">
              “{t.quote}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
