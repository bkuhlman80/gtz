

"use client";
import { useEffect, useState } from "react";

export default function ZoomBadge() {
  const [zoom, setZoom] = useState(100);
  useEffect(() => {
    const update = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      setZoom(Math.round((rem / 16) * 100)); // assumes base 16px
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (process.env.NODE_ENV !== "development" || zoom === 100) return null;
  return (
    <div className="fixed bottom-3 right-3 rounded bg-yellow-400/90 px-2 py-1 text-xs shadow">
      Zoom {zoom}%
    </div>
  );
}
