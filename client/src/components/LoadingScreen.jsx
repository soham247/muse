import React from 'react';
import { PulseLoader } from 'react-spinners';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center">
      <div className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
        <PulseLoader
          color="#60A5FA"
          size={15}
          margin={4}
          speedMultiplier={0.8}
        />
        <p className="mt-4 text-gray-400 text-sm">Cooking up a delicious blog...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;