"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Waves, Anchor } from "lucide-react";

interface Rapid {
  name: string;
  grade: string;
  description: string;
  position: number; // 0 to 1 along the path
}

interface Stretch {
  id: string;
  name: string;
  distance: string;
  startPoint: string;
  endPoint: string;
  price: string;
  rapids: Rapid[];
  accentColor: string;
}

const stretches: Stretch[] = [
  {
    id: "9km",
    name: "Brahmapuri to Rishikesh",
    distance: "9 KM",
    startPoint: "Brahmapuri",
    endPoint: "NIM Beach",
    price: "₹600",
    accentColor: "from-blue-400 to-cyan-400",
    rapids: [
      { name: "Initiation", grade: "Class I", description: "A gentle start to your journey.", position: 0.2 },
      { name: "Double Trouble", grade: "Class I+", description: "Twin waves that splash just enough.", position: 0.5 },
      { name: "Hilton", grade: "Class II", description: "Named after the hotel that once stood nearby.", position: 0.8 },
    ]
  },
  {
    id: "16km",
    name: "Shivpuri to Rishikesh",
    distance: "16 KM",
    startPoint: "Shivpuri",
    endPoint: "NIM Beach",
    price: "₹1000",
    accentColor: "from-cyan-400 to-teal-400",
    rapids: [
      { name: "Roller Coaster", grade: "Class III+", description: "Huge waves and big drops.", position: 0.3 },
      { name: "Golf Course", grade: "Class III+", description: "A technical rapid with lots of rocks.", position: 0.6 },
      { name: "Club House", grade: "Class II", description: "A fun splashy finish.", position: 0.85 },
    ]
  },
  {
    id: "26km",
    name: "Marine Drive to Rishikesh",
    distance: "26 KM",
    startPoint: "Marine Drive",
    endPoint: "NIM Beach",
    price: "₹1500",
    accentColor: "from-teal-400 to-emerald-400",
    rapids: [
      { name: "Three Blind Mice", grade: "Class III", description: "Three consecutive waves that keep you alert.", position: 0.25 },
      { name: "Crossfire", grade: "Class III", description: "Currents that pull from both sides.", position: 0.5 },
      { name: "Body Surfing", grade: "Class I", description: "The perfect spot to jump in and float.", position: 0.75 },
    ]
  },
  {
    id: "36km",
    name: "Kaudiyala to Rishikesh",
    distance: "36 KM",
    startPoint: "Kaudiyala",
    endPoint: "NIM Beach",
    price: "₹2500",
    accentColor: "from-emerald-400 to-green-500",
    rapids: [
      { name: "Daniel's Dip", grade: "Class III", description: "A steep drop that catches you by surprise.", position: 0.15 },
      { name: "The Wall", grade: "Class IV+", description: "The most legendary and difficult rapid on the river.", position: 0.4 },
      { name: "Three Blind Mice", grade: "Class III", description: "A series of waves that require sharp maneuvering.", position: 0.65 },
      { name: "Crossfire", grade: "Class III", description: "Tackle cross-currents that test your paddling.", position: 0.8 },
      { name: "Golf Course", grade: "Class III+", description: "Technical rocky stretch to finish the big one.", position: 0.92 },
    ]
  }
];

const RouteSection = ({ stretch, index }: { stretch: Stretch; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const riverPath = "M 50,0 Q 150,150 50,300 T 50,600 T 50,900";

  return (
    <div ref={containerRef} className="relative min-h-[150vh] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${stretch.accentColor} text-black font-bold text-sm mb-4`}>
            {stretch.distance} ADVENTURE
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
            {stretch.name}
          </h2>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase tracking-widest">Starting Point</span>
              <span className="text-white text-xl font-bold">{stretch.startPoint}</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase tracking-widest">Ending Point</span>
              <span className="text-white text-xl font-bold">{stretch.endPoint}</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase tracking-widest">Price</span>
              <span className="text-teal-400 text-2xl font-black">{stretch.price}</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Waves className="text-teal-400" /> Key Rapids
            </h3>
            <div className="grid gap-4">
              {stretch.rapids.map((rapid, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">{rapid.name}</h4>
                    <span className="text-xs font-black bg-teal-500/20 text-teal-400 px-2 py-1 rounded italic">{rapid.grade}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{rapid.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative h-[600px] lg:h-[800px] flex justify-center">
          <svg viewBox="0 0 200 900" className="h-full w-auto drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]" fill="none">
            <path d={riverPath} stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
            <motion.path
              d={riverPath}
              stroke="url(#riverGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
            <Marker position={0} label="START" />
            <Marker position={1} label="FINISH" />
            {stretch.rapids.map((rapid, idx) => (
              <Marker key={idx} position={rapid.position} label={rapid.name} isRapid grade={rapid.grade} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

const Marker = ({ position, label, isRapid, grade }: { position: number; label: string; isRapid?: boolean; grade?: string }) => {
  const y = position * 900;
  let x = 50;
  if (position < 0.33) x = 50 + (position / 0.33) * 50;
  else if (position < 0.66) x = 100 - ((position - 0.33) / 0.33) * 50;
  else x = 50;

  return (
    <motion.g initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + position * 0.5, type: "spring" }}>
      <circle cx={x} cy={y} r={isRapid ? 6 : 8} fill={isRapid ? "#f59e0b" : "#2dd4bf"} />
      <foreignObject x={x + 15} y={y - 10} width="120" height="40">
        <div className="flex flex-col">
          <span className={`text-[10px] font-black leading-none ${isRapid ? 'text-amber-400' : 'text-teal-400'} uppercase`}>{label}</span>
          {grade && <span className="text-[8px] text-white/60 italic">{grade}</span>}
        </div>
      </foreignObject>
    </motion.g>
  );
};

export default function RiverRouteMap() {
  return (
    <section className="bg-black relative">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black -translate-y-full z-10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-widest text-teal-400 uppercase mb-4">Choose Your Battle</h2>
        <p className="text-gray-400 max-w-2xl mx-auto px-4">
          From gentle flows to heart-pounding Class V rapids, explore our curated river stretches. 
          Scroll down to see the route, the rapids, and your destiny.
        </p>
      </div>
      {stretches.map((stretch, index) => (
        <RouteSection key={stretch.id} stretch={stretch} index={index} />
      ))}
    </section>
  );
}
