"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LipcareHero() {
  const scrollToLipscrub = () => {
    const section = document.getElementById("lipscrub");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ribbonText =
    "NOURISH. PROTECT. RADIATE. MADE IN LIPCRUSH • NOURISH. PROTECT. RADIATE. MADE IN LIPCRUSH • ";

  return (
    <div className="relative w-full overflow-hidden">
      {/* 🔝 Top Ribbon (➡️ right to left seamless) */}
      <div className="w-full bg-[#0f3c4c] text-white py-2 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-semibold tracking-wide"
        >
          <span className="mr-8">{ribbonText}</span>
          <span>{ribbonText}</span>
        </motion.div>
      </div>

      {/* 🎥 Hero Section */}
      <div className="relative flex items-center justify-center min-h-[70vh] w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        >
          <source src="/lip.mp4" type="video/mp4" />
          <Image
            src="/fir1.jpeg"
            alt="Lipcare background"
            fill
            className="object-cover"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl text-center px-6"
        >
          <p className="text-white/90 italic text-lg">Introducing...</p>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 drop-shadow-md">
            Lipcare
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed drop-shadow">
            The ultimate daily ritual for soft, smooth, and nourished lips.
            Hydration, protection, and repair — redefined for your pout.
          </p>

          <button
            onClick={scrollToLipscrub}
            className="mt-6 px-6 py-3 bg-white text-[#0f3c4c] font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            All about Lipscrub
          </button>
        </motion.div>
      </div>

      {/* 🔻 Bottom Ribbon (⬅️ left to right seamless) */}
      <div className="w-full bg-[#0f3c4c] text-white py-2 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-semibold tracking-wide"
        >
          <span className="mr-8">{ribbonText}</span>
          <span>{ribbonText}</span>
        </motion.div>
      </div>
    </div>
  );
}
