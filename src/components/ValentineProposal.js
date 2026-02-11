import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './ValentineProposal.css';

// 🎨 EASY GIF CUSTOMIZATION - Change URLs here!
const GIFS = {
  step1: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVwb2w4cmJhOXJ2YWtqYTh5aXBpNHUyanlmcTk1dDlpbDljMXB1cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LFay0DyV6urKw/giphy.gif',
  step2Wrong: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHQ0dHh0YTZ2Nnd4MDd2NWRlejZvdmRoYjRyeWZ2eGEzYm83ajIyYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vAeB18YnyYfKaS2V4z/giphy.gif',
  step3: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM29tdHg3OGswdmI2aGY3MnFvdDc5dThoMnZkenE1ejFoNXM1aDhxeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/In0Lpu4FVivjISX9HT/giphy.gif',
  step3Sad: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM29tdHg3OGswdmI2aGY3MnFvdDc5dThoMnZkenE1ejFoNXM1aDhxeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.gif',
  step4: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM29tdHg3OGswdmI2aGY3MnFvdDc5dThoMnZkenE1ejFoNXM1aDhxeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Zl7u48zLVFgLpRwq6f/giphy.gif',
  step5: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNzYjR3ZzRpNXpjNjgzZGNnNWlvNWhiYnZvYzFwMGVqc2d5ODBiaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ytu2GUYbvhz7zShGwS/giphy.gif'
};

// Puzzle questions - CUSTOMIZE THESE!
// Moved outside component to fix ESLint exhaustive-deps warning
const puzzleQuestions = [
  {
    question: "Unscramble the word: V L O E",
    answer: "LOVE",
    hint: "4 letters, starts with L"
  },
  {
    question: "What has a heart that doesn't beat?",
    answer: "ARTICHOKE",
    hint: "It's a vegetable!"
  },
  {
    question: "Complete: Roses are red, violets are ___",
    answer: "BLUE",
    hint: "It's a color"
  }
];

const ValentineProposal = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [dateAnswer, setDateAnswer] = useState('');
  const [puzzle, setPuzzle] = useState([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "info", // info | error | confirm | hint
    hint: null,
    gif: null
  });
  const [hintCountdown, setHintCountdown] = useState(null);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserName(params.get('name') || 'Beautiful');
  }, []);

  useEffect(() => {
    if (step === 3) {
      setPuzzle(shuffleArray([...puzzleQuestions]));
    }
  }, [step]);

  useEffect(() => {
    if (hintCountdown === null) return;
    
    const timer = setInterval(() => {
      setHintCountdown(prev => {
        if (prev <= 1) {
          setPopup(prev => ({ ...prev, hint: null }));
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hintCountdown]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Step 2: Date Quiz
  const handleDateSubmit = () => {
    // CUSTOMIZE THE SPECIAL DATE HERE!
    const correctDate = '15-08-2022';
    const normalizedAnswer = dateAnswer.trim().toLowerCase();
    const normalizedCorrect = correctDate.toLowerCase();

    if (normalizedAnswer === normalizedCorrect || 
        normalizedAnswer === '15/08/2022' || 
        normalizedAnswer === '15.08.2022' ||
        normalizedAnswer === '2022-08-15') {
      setTimeout(() => setStep(3), 500);
    } else {
      setPopup({
        show: true,
        message: "Ohhh nooo! You forgot it! 😭\n\nTry again, think carefully! 💕",
        type: "error",
        hint: "It happened in 2022!",
        gif: GIFS.step2Wrong
      });
      setHintCountdown(4);
    }
  };

  // Step 3: Puzzle Game
  const handlePuzzleSubmit = () => {
    const currentQuestion = puzzle[currentPuzzleIndex];
    if (puzzleAnswer.trim().toUpperCase() === currentQuestion.answer.toUpperCase()) {
      setPuzzleAnswer('');
      if (currentPuzzleIndex < puzzle.length - 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      } else {
        setTimeout(() => setStep(4), 500);
      }
    } else {
      setPopup({
        show: true,
        message: "Oops! That's not quite right 🥺 Try again!",
        type: "error"
      });
      setPuzzleAnswer('');
    }
  };

  const showHint = () => {
    const currentQuestion = puzzle[currentPuzzleIndex];
    setPopup({
      show: true,
      message: currentQuestion.hint,
      type: "hint",
      hint: null
    });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "info", hint: null });
    }, 3000);
  };

  // Step 5: Moving No Button
  const moveNoButton = () => {
    if (containerRef.current && noBtnRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noBtnRef.current.getBoundingClientRect();
      
      const maxX = container.width - button.width - 40;
      const maxY = container.height - button.height - 40;
      
      setNoButtonPosition({
        x: Math.random() * Math.max(0, maxX),
        y: Math.random() * Math.max(0, maxY)
      });
    }
  };

  const handleNoClick = () => {
    setPopup({
      show: true,
      message: "Are you REALLY sure?? 😭💔",
      type: "confirm"
    });
  };

  // Step 6: YES! - Fire Confetti
  const handleYes = () => {
    setStep(6);
    fireConfetti();
  };

  const handlePopupAction = (accepted) => {
    if (popup.type === "confirm" && accepted) {
      setPopup({ ...popup, show: false });
      setTimeout(() => {
        setPopup({
          show: true,
          message: "Nope! That answer is not accepted 😤💕",
          type: "error",
          hint: null
        });
        moveNoButton();
      }, 300);
    } else {
      setPopup({ ...popup, show: false });
    }
  };

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#ff6b9d', '#ff4d6d', '#ffa4c7', '#ffb6d9', '#ff85a9', '#ffd93d']
    };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire from left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0, y: 0.6 },
        angle: 60,
        spread: 55,
        startVelocity: 55
      });

      // Fire from right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1, y: 0.6 },
        angle: 120,
        spread: 55,
        startVelocity: 55
      });
    }, 250);
  };

  return (
    <div className="valentine-app">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="heart-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${20 + Math.random() * 20}px`
            }}
          >
            {['💖', '💕', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)]}
          </span>
        ))}
      </div>

      <div className="container" ref={containerRef}>
        {/* Step 1: Initial Message */}
        {step === 1 && (
          <div className="step-content">
            <h1>💖 Hey {userName}... 💖</h1>
            <p>I have something really important to ask you 🥺</p>
            <div className="gif-container">
              <img src={GIFS.step1} alt="Cute blushing" />
            </div>
            <div className="button-group">
              <button className="btn-continue" onClick={() => setStep(2)}>
                Continue 💕
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Special Date Quiz */}
        {step === 2 && (
          <div className="step-content">
            <h1>Quick Question! 💭</h1>
            <p>What was our special date? 📅</p>
            <p className="hint-text">(Format: DD-MM-YYYY)</p>

            <div className="input-container">
              <input
                type="text"
                className="date-input"
                placeholder="Enter date in dd-mm-yyyy fromat"
                value={dateAnswer}
                onChange={(e) => setDateAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDateSubmit()}
              />
            </div>

            <div className="button-group">
              <button className="btn-submit" onClick={handleDateSubmit}>
                Submit 💕
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Puzzle Game */}
        {step === 3 && puzzle.length > 0 && (
          <div className="step-content">
            <h1>Mini Puzzle Challenge! 🧩</h1>
            <p className="puzzle-progress">Question {currentPuzzleIndex + 1} of {puzzle.length}</p>
            
            <div className="puzzle-box">
              <p className="puzzle-question">{puzzle[currentPuzzleIndex].question}</p>
            </div>

            <div className="input-container">
              <input
                type="text"
                className="puzzle-input"
                placeholder="Your answer..."
                value={puzzleAnswer}
                onChange={(e) => setPuzzleAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePuzzleSubmit()}
              />
            </div>

            <div className="button-group">
              <button className="btn-hint" onClick={showHint}>
                Hint 💡
              </button>
              <button className="btn-submit" onClick={handlePuzzleSubmit}>
                Submit ✨
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="step-content">
            <h1>Wait... 🤔</h1>
            <p>Are you absolutely SURE you want to see this?</p>
            <div className="gif-container">
              <img src={GIFS.step3} alt="Thinking" />
            </div>
            <div className="button-group">
              <button className="btn-yes" onClick={() => setStep(5)}>
                Yes! 💖
              </button>
              <button className="btn-no" onClick={() => setStep(4.5)}>
                Not really... 🙈
              </button>
            </div>
          </div>
        )}

        {/* Step 4.5: Sad Reaction */}
        {step === 4.5 && (
          <div className="step-content">
            <h1>Oh come onnnn! 😭</h1>
            <p>Please? Pretty please? 🥺</p>
            <div className="gif-container">
              <img src={GIFS.step3Sad} alt="Crying cute" />
            </div>
            <div className="button-group">
              <button className="btn-continue" onClick={() => setStep(4)}>
                Okay fine... 💕
              </button>
            </div>
          </div>
        )}

        {/* Step 5: The Big Question */}
        {step === 5 && (
          <div className="step-content">
            <div className="proposal-text">
              {userName},<br />
              Will You Be My Valentine? 💖
            </div>
            <div className="gif-container">
              <img src={GIFS.step4} alt="Hearts" />
            </div>
            <div className="button-group">
              <button className="btn-yes" onClick={handleYes}>
                YES! 💖
              </button>
              <button
                ref={noBtnRef}
                className="btn-no"
                style={{
                  position: noButtonPosition.x || noButtonPosition.y ? 'absolute' : 'relative',
                  left: noButtonPosition.x ? `${noButtonPosition.x}px` : 'auto',
                  top: noButtonPosition.y ? `${noButtonPosition.y}px` : 'auto'
                }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={handleNoClick}
              >
                No 😏
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Success! */}
        {step === 6 && (
          <div className="step-content">
            <h1>I KNEW IT! 😌💗</h1>
            <div className="gif-container">
              <img src={GIFS.step5} alt="Celebration" />
            </div>
            <div className="success-message">
              You just made me the happiest! 🥰<br />
              Can't wait for our Valentine's Day! 💕
            </div>
          </div>
        )}

        {popup.show && (
          <div className="popup-overlay">
            <div className={`popup-box ${popup.type}`}>
              {popup.gif && (
                <div className="popup-gif">
                  <img src={popup.gif} alt="Reaction" />
                </div>
              )}

              <p className="popup-message">{popup.message}</p>

              {popup.hint && (
                <div className="popup-hint">
                  💡 {popup.hint}
                  <div className="hint-timer">Disappears in <span className="countdown">{hintCountdown}</span>s</div>
                </div>
              )}

              {popup.type === "confirm" ? (
                <div className="popup-buttons">
                  <button onClick={() => handlePopupAction(true)}>
                    Yes 😭
                  </button>
                  <button onClick={() => handlePopupAction(false)}>
                    No 🙈
                  </button>
                </div>
              ) : (
                <button onClick={() => handlePopupAction(false)}>
                  Okay 💕
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineProposal;