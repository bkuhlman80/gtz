"use client";
import { useState } from "react";

type Props = { src: string; alt?: string; className?: string };

export default function ZoomImg({ src, alt = "", className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}
