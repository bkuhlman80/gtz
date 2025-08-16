
import Link from "next/link";
import Wheel from "./Wheel";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
     <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between"> 
     <img src="/assets/brand/logo.svg" alt="Zodi" className="h-8 md:h-10" /> 
     {/* menu button later */} </div> <div className="max-w-6xl mx-auto px-4 pb-6"> 
     <p className="mt-3 opacity-80 max-w-2xl">Explore playlists, insights, and games for every sign.</p>
      </div>
      <Wheel />
      <div className="mt-10 flex justify-center pb-10">
<Link
  href="#subscribe"
  className="px-6 py-3 rounded-2xl 
bg-gradient-to-r from-gray-300 to-gray-500
 text-black font-semibold shadow-lg 
 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
 focus:ring-amber-400 transition"
>
  Subscribe for Playlists, Art, Gaming & Insights
</Link>

      </div>
    </header>
  );
}
