import React, { useEffect, useState, useRef } from "react";
import SecondSlide from "./SecondSlide.jsx";

const FLOWERS = [
  "🌻",
  "🪻",
];

function getRandomFlower() {
  return FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
}

function getRandomLeft() {
  return Math.random() * 90; // percent
}

function getRandomDuration() {
  return 3 + Math.random() * 2; // 3-5 seconds
}

function FallingFlowers() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    let running = true;
    let start = Date.now();

    function addFlower() {
      if (!running) return;
      setFlowers((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          emoji: getRandomFlower(),
          left: getRandomLeft(),
          duration: getRandomDuration(),
        },
      ]);
      if (Date.now() - start < 5000) {
        setTimeout(addFlower, 200 + Math.random() * 300);
      }
    }
    addFlower();
    return () => {
      running = false;
    };
  }, []);

  return (
    <>
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="pointer-events-none select-none text-8xl sm:text-9xl md:text-[8rem] fixed top-0"
          style={{
            left: `${flower.left}%`,
            animation: `fall ${flower.duration}s linear forwards`,
          }}
        >
          {flower.emoji}
        </span>
      ))}
      <style>
        {`
          @keyframes fall {
            0% { top: -2em; opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100vh; opacity: 0; }
          }
        `}
      </style>
    </>
  );
}

function App() {
  const [showRoses, setShowRoses] = useState(false);
  const [showBoop, setShowBoop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioReady) {
      const rosesTimeout = setTimeout(() => setShowRoses(true), 5200);
      const boopTimeout = setTimeout(() => setShowBoop(true), 5500);
      return () => {
        clearTimeout(rosesTimeout);
        clearTimeout(boopTimeout);
      };
    }
  }, [audioReady]);

  const handleAudioStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setAudioReady(true);
  };

  const goToNextSlide = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSlide(1);
  };

  if (!audioReady) {
    return (
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <audio ref={audioRef} src="/rot.mp3" loop style={{ display: 'none' }} />
        <div
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
              radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
              radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
              radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
              linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
            `,
          }}
        />
        <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-4">
          <img
            src="/parrot.jpg"
            alt="Parrot"
            className="object-cover shadow-lg border-2 border-white"
            style={{ width: '96px', height: '96px' }}
          />
          <button
            onClick={handleAudioStart}
            className="px-6 py-3 bg-indigo-300 text-white font-bold rounded-full text-2xl shadow-lg transform transition-all duration-200 hover:scale-105 pixel-font"
          >
            click here
          </button>
          <img
            src="/bow.jpg"
            alt="Bow"
            className="object-cover shadow-lg border-2 border-white"
            style={{ width: '48px', height: '48px' }}
          />
        </div>
      </div>
    );
  }
  
  if (currentSlide === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <audio ref={audioRef} src="/rot.mp3" loop style={{ display: 'none' }} />
        <div
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
              radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
              radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
              radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
              linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
            `,
          }}
        />
        <FallingFlowers />
        <div className="relative flex flex-col items-center justify-center h-full w-full z-10">
          <div className="flex items-center mb-4">
            {showRoses && (
              <span className="text-[4rem] font-bold italic text-purple-600 drop-shadow-lg">
                🥀
              </span>
            )}
            <img
              src="/dog.jpg"
              alt="Dog"
              className="mx-4 w-20 h-20 object-cover animate-[customGrow_5.2s_ease-out]"
              style={{ maxWidth: "96px", maxHeight: "96px" }}
            />
            {showRoses && (
              <span className="text-[4rem] font-bold italic text-purple-600 drop-shadow-lg">
                🥀
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold italic text-purple-600 drop-shadow-lg bg-red-500 text-center">
            <span className="block">ITS YOUR BIRTHDAY</span>
            <span className="block">TWINNNNN!!!!!!</span>
          </h1>
          <style>
            {`
              @keyframes customGrow {
                0% { transform: scale(0.2); opacity: 0.5; }
                80% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes bounce-slow {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-20px);
                }
                60% {
                  transform: translateY(-10px);
                }
              }
            `}
          </style>
          
          <div className="mt-8 mb-8">
            <img
              src="/cake.jpg"
              alt="Birthday Cake"
              className="object-cover shadow-lg border-2 border-white"
              style={{ width: '96px', height: '96px' }}
            />
          </div>

          {showBoop && (
            <button
              className="mt-8 animate-bounce-slow cursor-pointer p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200"
              onClick={goToNextSlide}
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

          {showBoop && (
            <div className="mt-2 flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${currentSlide === 0 ? 'bg-white' : 'bg-gray-400'}`}></div>
              <div className={`w-3 h-3 rounded-full ${currentSlide === 1 ? 'bg-white' : 'bg-gray-400'}`}></div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <SecondSlide />;
  }
}

export default App;