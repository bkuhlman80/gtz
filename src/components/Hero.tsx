import Wheel from "./Wheel";

export default function Hero(){
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <img src="/assets/brand/logo.svg" alt="Logo" className="h-8" />
        {/* menu icon later */}
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <h1 className="text-4xl md:text-6xl font-serif">Tuned by the Sky, Powered by Spotify</h1>
        <p className="mt-3 opacity-80 max-w-2xl">Explore playlists, art, and posts for every sign.</p>
      </div>
      <Wheel/>
    </header>
  );
}
