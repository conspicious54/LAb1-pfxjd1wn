import React from 'react';
import { PlayCircle } from 'lucide-react';

export function VideoSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl mb-12 transform transition-all hover:scale-[1.02] duration-300 border border-blue-500/20 backdrop-blur-sm group">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
      <div className="aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative transform transition-all duration-300 group-hover:scale-110">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          <PlayCircle className="w-24 h-24 text-white opacity-90 group-hover:opacity-100 cursor-pointer relative z-10" />
        </div>
      </div>
    </div>
  );
}