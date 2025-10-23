import React from 'react';

export default function Preloader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-black to-gray-900 flex flex-col justify-center items-center z-[9999] animate-fadeIn">
      <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 font-bold text-3xl mb-5 animate-spin-slow">
        I
      </div>
      <div className="text-5xl font-bold text-yellow-500 mb-8 text-center">
        Invictus Solutions
      </div>
      <div className="text-yellow-500 text-xl font-medium mb-10">
        Loading...
      </div>
      <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
}