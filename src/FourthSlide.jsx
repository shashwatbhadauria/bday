import React, { useState } from 'react';
import './SecondSlide.css';
import FifthSlide from './FifthSlide.jsx';

// Import assets
import wishVideo from './assets/wish.mp4'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'

const FourthSlide = () => {
  const [showFifthSlide, setShowFifthSlide] = useState(false);

  const handlePlayGame = () => {
    setShowFifthSlide(true);
  };

  if (showFifthSlide) {
    return <FifthSlide />;
  }

  return (
    <div className="second-slide-container">
      <div className="content">
        <video
          src={wishVideo}
          controls
          loop
          autoPlay
          className="wish-video"
          style={{
            maxWidth: '80vw',
            maxHeight: '60vh',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            border: '4px solid #f0f0f0',
            backgroundColor: '#f0f0f0',
          }}
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="text-content mt-8 flex flex-col items-center">
          <p className="text-center text-4xl font-bold text-purple-600 drop-shadow-lg">
            HAPPIEST BIRTHDAY!!! &lt;333333
          </p>
          <p className="text-center text-3xl font-bold text-gray-800">
            MAZE KARNA PURE DIN U DESERVE!!!
          </p>
          
          {/* Container for the images */}
          <div className="flex justify-center space-x-4 mt-4">
            <img src={img1} alt="Image 1" style={{ width: '100px', height: 'auto' }} />
            <img src={img2} alt="Image 2" style={{ width: '100px', height: 'auto' }} />
            <img src={img3} alt="Image 3" style={{ width: '100px', height: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSlide;