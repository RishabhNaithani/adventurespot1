import { ArrowRight } from "lucide-react";

interface AdventureCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
}

export default function AdventureCard({ title, description, price, duration }: AdventureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/20 transition-all group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">{description}</p>
      </div>
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/20 pt-4">
        <div>
          <span className="block text-xs text-teal-300 font-semibold uppercase tracking-wider">{duration}</span>
          <span className="block text-xl font-extrabold text-white">{price}</span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors flex items-center justify-center">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
