import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import AdventureCard from "@/components/AdventureCard";

export default function Home() {
  return (
    <main className="min-h-[300vh] relative">
      {/* Background Canvas */}
      <ScrollVideoCanvas 
        videoSrc={["/videos/bungy.webm", "/videos/bungy.mp4"]} 
        fallbackImageSrc="/images/bungy-fallback.jpg" 
      />

      {/* Content Layers */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-screen pointer-events-none">
        
        {/* Hero Section */}
        <div className="max-w-2xl mt-20 pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
            Leap Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">The Void</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 drop-shadow-md">
            Experience the ultimate adrenaline rush with our world-class bungy jumping locations. Scroll down to dive deeper.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="self-center flex flex-col items-center animate-bounce opacity-70 mt-20">
          <span className="text-sm font-bold tracking-widest uppercase mb-2">Scroll to dive</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-orange-500 to-transparent" />
        </div>
      </div>

      {/* Spaced Content Sections to allow scrolling */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdventureCard 
            title="The Canyon Drop"
            description="A terrifying 134m plunge over the Nevis River. Not for the faint-hearted."
            price="$250"
            duration="Half Day"
          />
          <AdventureCard 
            title="Bridge Swing"
            description="Freefall and swing in a massive arc over a stunning gorge."
            price="$199"
            duration="3 Hours"
          />
          <AdventureCard 
            title="Night Jump"
            description="Experience sensory deprivation with our exclusive moonlit bungy events."
            price="$299"
            duration="Evening"
          />
        </div>
      </div>
    </main>
  );
}
