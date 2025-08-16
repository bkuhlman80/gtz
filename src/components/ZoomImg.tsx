"use client";
import { useState } from "react";
import Image from "next/image";

type Props = { src: string; alt?: string; className?: string; width?: number; height?: number };

export default function ZoomImg({ src, alt = "", className, width = 600, height = 600 }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}
