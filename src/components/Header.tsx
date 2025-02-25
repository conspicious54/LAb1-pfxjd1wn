import React from 'react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-block">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-4 animate-gradient">
          Welcome to the Passion Product Formula
        </h1>
      </div>
      <p className="text-lg text-blue-200 max-w-2xl mx-auto">
        Let's discover your entrepreneurial journey and create something amazing together
      </p>
    </div>
  );
}