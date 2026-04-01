import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import AdventureCard from "@/components/AdventureCard";

export default function TrekkingPage() {
  return (
    <main className="min-h-[300vh] relative">
      <ScrollVideoCanvas 
        videoSrc={["/videos/trekking.webm", "/videos/trekking.mp4"]} 
        fallbackImageSrc="/images/trekking-fallback.jpg" 
      />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-screen pointer-events-none">
        <div className="max-w-2xl mt-20 pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
            Reach <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">The Summit</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 drop-shadow-md">
            Push your limits on majestic alpine trails. Scroll to begin the ascent.
          </p>
        </div>

        <div className="self-center flex flex-col items-center animate-bounce opacity-70 mt-20">
          <span className="text-sm font-bold tracking-widest uppercase mb-2">Scroll to climb</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdventureCard 
            title="Basecamp Trek"
            description="Experience high altitude landscapes over an iconic 12-day route."
            price="$1,200"
            duration="12 Days"
          />
          <AdventureCard 
            title="Alpine Ridge Pass"
            description="A challenging 4-day hike traversing remote mountain ridges."
            price="$450"
            duration="4 Days"
          />
          <AdventureCard 
            title="Glacier Walk"
            description="Strap on crampons and explore deep crevasses and ice caves."
            price="$180"
            duration="Full Day"
          />
        </div>
      </div>
    </main>
  );
}
