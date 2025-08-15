"use client";
import { motion } from "framer-motion";

export default function Wheel() {
  return (
    <div className="relative max-w-3xl mx-auto p-6">
      <motion.img
        src="/assets/hero/zodiac_wheel.png"
        alt="Zodiac wheel"
        className="w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />

      {/* Sun ~10x visually (tweak sizes as you like) */}
      <img
        src="/assets/hero/sun.png"
        alt=""
        className="absolute right-[-2rem] top-[-2rem] pointer-events-none select-none
                   w-[16rem] md:w-[20rem]"
      />

      {/* Moon ~10x visually */}
      <img
        src="/assets/hero/moon.png"
        alt=""
        className="absolute left-[-3rem] bottom-[-3rem] pointer-events-none select-none
                   w-[16rem] md:w-[20rem]"
      />
    </div>
  );
}
