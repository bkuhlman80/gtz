import Wheel from "./Wheel";

export default function Hero(){
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
  <img src="/assets/brand/logo.svg" alt="Zodi" className="h-8 md:h-10" />
  {/* menu button later */}
</div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <h1 className="text-4xl md:text-6xl font-serif">Welcome to the Starcade</h1>
        <p className="mt-3 opacity-80 max-w-2xl">Explore playlists, art, and posts for every sign.</p>
      </div>
      <Wheel/>
    </header>
  );
}
