import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import AdventureCard from "@/components/AdventureCard";

export default function RaftingPage() {
  return (
    <main className="min-h-[300vh] relative">
      <ScrollVideoCanvas 
        videoSrc="/videos/rafting.mp4" 
        fallbackImageSrc="/images/rafting-fallback.jpg" 
      />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-screen pointer-events-none">
        <div className="max-w-2xl mt-20 pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
            Conquer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">The Rapids</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 drop-shadow-md">
            Battle class V rapids on some of the wildest rivers on earth. Scroll to navigate the waters.
          </p>
        </div>

        <div className="self-center flex flex-col items-center animate-bounce opacity-70 mt-20">
          <span className="text-sm font-bold tracking-widest uppercase mb-2">Scroll to paddle</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-teal-500 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdventureCard 
            title="Whitewater Rush"
            description="Tackle intense Class IV and V rapids for the ultimate thrill."
            price="$150"
            duration="Full Day"
          />
          <AdventureCard 
            title="Family Float"
            description="A scenic and exciting Class II-III run perfect for beginners."
            price="$89"
            duration="Half Day"
          />
          <AdventureCard 
            title="Multi-Day Expedition"
            description="Camp along the riverbanks on this 3-day immersive rafting journey."
            price="$599"
            duration="3 Days"
          />
        </div>
      </div>
    </main>
  );
}
