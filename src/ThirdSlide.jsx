import React, { useState, useEffect, useRef } from 'react';
import './SecondSlide.css';
import FourthSlide from './FourthSlide.jsx';

const choices = [
  { name: 'rock', emoji: '✊' },
  { name: 'paper', emoji: '✋' },
  { name: 'scissors', emoji: '✌️' },
];

const ThirdSlide = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gamePlayed, setGamePlayed] = useState(false);
  const [showFourthSlide, setShowFourthSlide] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playGame = (choiceName) => {
    setIsChoosing(true);
    setUserChoice(choices.find(c => c.name === choiceName));
    setComputerChoice(null);

    setTimeout(() => {
      const user = choices.find(c => c.name === choiceName);
      const computer = choices[Math.floor(Math.random() * choices.length)]; // Now always random
      
      let newResult;
      if (user.name === computer.name) {
        newResult = "😡😡stop copying me😡😡";
      } else if (
        (user.name === 'rock' && computer.name === 'scissors') ||
        (user.name === 'paper' && computer.name === 'rock') ||
        (user.name === 'scissors' && computer.name === 'paper')
      ) {
        newResult = "✅✅fluke win!✅✅";
      } else {
        newResult = "❌❌ez win for me❌❌";
      }

      setComputerChoice(computer);
      setResult(newResult);
      setGamePlayed(true);
      setIsChoosing(false);
    }, 1500);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setGamePlayed(false);
  };

  const proceedToFourthSlide = () => {
    setShowFourthSlide(true);
  };

  if (showFourthSlide) {
    return <FourthSlide />;
  }

  return (
    <div className="second-slide-container">
      <audio ref={audioRef} src="/classic.mp3" loop style={{ display: 'none' }} />
      
      <div className="content">
        <h2 className="text-5xl font-bold italic text-purple-600 mb-8 drop-shadow-lg text-center">
          play rock, paper, scissors with me!
        </h2>

        {!userChoice && (
          <div className="flex justify-center items-center space-x-8 mb-10">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => playGame(choice.name)}
                className="bg-black text-white font-bold py-10 px-12 rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-transform duration-200 text-7xl"
              >
                {choice.emoji}
              </button>
            ))}
          </div>
        )}

        {userChoice && (
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-3xl font-bold italic text-gray-800 mb-4">
              {isChoosing ? "waiting for the results..." : "✨result✨"}
            </h3>
            <div className="flex justify-between w-full max-w-sm">
              <div className="text-center">
                <p className="text-xl font-semibold mb-2 text-gray-800">you</p>
                {isChoosing ? (
                  <img src="/think.jpg" alt="Thinking" style={{ width: '120px', height: '120px' }} />
                ) : (
                  <div className="text-8xl">{userChoice.emoji}</div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold mb-2 text-gray-800">me</p>
                {isChoosing ? (
                  <img src="/monke.jpg" alt="Thinking monkey" style={{ width: '120px', height: '120px' }} />
                ) : (
                  <div className="text-8xl">{computerChoice.emoji}</div>
                )}
              </div>
            </div>
            {!isChoosing && (
              <div className="flex flex-col items-center">
                <p className="text-purple-700 text-4xl mt-4 text-center">{result}</p>
                {result === "✅✅fluke win!✅✅" && (
                  <img src="/harry.jpg" alt="Harry" style={{ width: '200px', marginTop: '20px' }} />
                )}
                {result === "😡😡stop copying me😡😡" && (
                  <img src="/sabrina.jpg" alt="Sabrina" style={{ width: '200px', marginTop: '20px' }} />
                )}
                {result === "❌❌ez win for me❌❌" && (
                  <img src="/taylor.jpg" alt="Taylor" style={{ width: '200px', marginTop: '20px' }} />
                )}
              </div>
            )}
          </div>
        )}

        {gamePlayed && (
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={resetGame}
              className="bg-purple-300 hover:bg-purple-400 text-purple-800 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-xl"
            >
              Play Again
            </button>
            {result === "✅✅fluke win!✅✅" && (
              <button
                className="mt-8 animate-bounce-slow cursor-pointer"
                onClick={proceedToFourthSlide}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold italic text-purple-600">
                    boop here for more
                  </span>
                  <img
                    src="/boop.jpg"
                    alt="Boop"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdSlide;