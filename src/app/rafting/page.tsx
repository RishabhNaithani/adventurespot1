"use client";

import { motion } from "framer-motion";
import ScrollVideoCanvas from "@/components/ScrollVideoCanvas";
import RiverRouteMap from "@/components/RiverRouteMap";

export default function RaftingPage() {
  return (
    <main className="min-h-screen relative text-white">
      {/* Background Scroll Video */}
      <ScrollVideoCanvas 
        videoSrc={["/videos/rafting.webm", "/videos/rafting.mp4"]} 
        fallbackImageSrc="/images/rafting-fallback.jpg" 
      />

      {/* Hero Section */}
      <div className="h-[300vh] relative">
        <div className="sticky top-0 h-screen z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between pointer-events-none">
          <div className="max-w-2xl mt-20 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
                Conquer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">The Rapids</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 drop-shadow-md">
                Battle class V rapids on some of the wildest rivers on earth. Scroll to navigate the waters.
              </p>
            </motion.div>
          </div>

          <div className="self-center flex flex-col items-center animate-bounce opacity-70 mb-20">
            <span className="text-sm font-bold tracking-widest uppercase mb-2">Scroll to paddle</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-teal-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* Interactive River Map Section */}
      <div className="relative z-20">
        <RiverRouteMap />
      </div>

      {/* Footer-like CTA */}
      <div className="py-40 bg-black flex flex-col items-center justify-center text-center px-4 relative z-20">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Ready for the splash?</h2>
        <button className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-4 px-12 rounded-full text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(45,212,191,0.4)]">
          BOOK YOUR RAFT
        </button>
      </div>
    </main>
  );
}
