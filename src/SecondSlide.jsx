import React, { useEffect, useState } from 'react';
import './SecondSlide.css';
import ThirdSlide from './ThirdSlide.jsx';

const SecondSlide = () => {
  const [showNext, setShowNext] = useState(false);
  const [showThirdSlide, setShowThirdSlide] = useState(false);

  useEffect(() => {
    // Show the "boop" button after an 8-second delay
    const timeout = setTimeout(() => setShowNext(true), 8000); 
    return () => clearTimeout(timeout);
  }, []);

  const handleNavigateToThird = () => {
    setShowThirdSlide(true);
  };

  if (showThirdSlide) {
    return <ThirdSlide />;
  }

  return (
    <div className="second-slide-container">
      <div className="content">
        <p className="text-xl font-bold italic text-blue-800 mb-0 text-center drop-shadow-lg">
          stop worrying so much about the exams, everything will turn out well
        </p>
        <p className="text-sm italic text-gray-600 mt-0 text-center mb-4">
          you will be fine !
        </p>
        
        <video
          src="/cats.mp4"
          controls
          autoPlay
          loop
          className="w-full max-w-xl h-auto rounded-lg shadow-xl border-4 border-purple-500 overflow-hidden"
          style={{ maxWidth: '80vw', maxHeight: '80vh' }}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* The button is now a proper button element */}
        {showNext && (
          <button
            className="mt-8 animate-bounce-slow cursor-pointer"
            onClick={handleNavigateToThird}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold italic text-purple-600">boop here for more</span>
              <img
                src="/boop.jpg"
                alt="Boop"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SecondSlide;