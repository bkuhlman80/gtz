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
      <img src="/assets/hero/sun.png"  alt="" className="w-20 absolute right-6 top-6" />
      <img src="/assets/hero/moon.png" alt="" className="w-14 absolute left-6 bottom-6" />
    </div>
  );
}
