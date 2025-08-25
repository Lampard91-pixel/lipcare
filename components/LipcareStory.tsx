"use client";

import Image from "next/image";

export default function LipcareStory() {
  return (
    <section className="w-full bg-pink-100 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        
        {/* Left Image */}
        <div className="flex-1 max-w-lg">
          <Image
            src="/fir1.jpeg" // 👈 replace with your image
            alt="Lip care happiness"
            width={500}
            height={400}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 text-center md:text-left text-gray-800">
          <h2 className="text-5xl font-bold mb-6 text-[#b8325a] leading-snug">
            A Natural Lip Care Solution
          </h2>

          <p className="text-xl mb-4">
            Our lip balms are crafted with nourishing natural oils and butters —
            designed to keep your lips soft, hydrated, and protected all day.
          </p>

          <p className="text-xl mb-4">
            We believe in simple, honest care — no harsh chemicals, just
            effective natural hydration.
          </p>

          <p className="text-xl mb-8">
            Everyday lip wellness, powered by nature.
          </p>

          <button className="px-6 py-3 bg-[#b8325a] text-white font-semibold rounded-full shadow-lg hover:bg-[#972f4a] transition">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}
