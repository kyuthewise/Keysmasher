import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [numVal, setNumVal] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);
  const [typedLetters, setTypedLetters] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const[timeon, settimeon] = useState(false);


  const handleChange = (event) => {

    if (words.length === 0 || currentWordIndex >= words.length) {
      return;
    }
    const typedValue = event.target.value;
    
    
    console.log(typedValue)

    if (startTime === null) {
      setStartTime(Date.now());
    }
    setInputValue(typedValue);
    // Check if the typed value matches the current word up to the typed length
    if (typedValue === words[currentWordIndex].slice(0, typedValue.length)) {
      setTypedLetters(typedValue);

  
      // Check if the entire word has been typed correctly
      if (typedValue === words[currentWordIndex]) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setTypedLetters('');
        setNumVal((prevNumVal) => prevNumVal + 1);
        setInputValue('');
        handleSpaceKey();
      }
    } else {
      setTypedLetters(typedValue);
    }

    
  };
  const handleSpaceKey = () => {
    if (inputValue.trim() === words[currentWordIndex]) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setTypedLetters('');
      setInputValue('');
      setNumVal((prevNumVal) => prevNumVal + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      
      if (event.key === 'Backspace') {
        if(inputValue === ''){
          return;
        }

        setInputValue((prevInputValue) => {
          const updatedValue = prevInputValue.slice(0, -1);
          handleChange({ target: { value: updatedValue } });

        
      }); }
      else if (event.key === ' ') {
        handleSpaceKey(); }

      else {
        const typedValue = inputValue + event.key;
        setInputValue(typedValue);
        handleChange({ target: { value: typedValue } });
        
    };
  };
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue]);

  const fetchUserData = () => {
    fetch('https://random-word-api.vercel.app/api?words=30')
      .then((response) => response.json())
      .then((data) => {
        setWords(data);

      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setVisible(numVal === words.length);
  }, [numVal, words]);
let charnum = 0;
for(let i = 0; i < currentWordIndex; i++){
  charnum += words[i].length;
}
function RestartButton() {

    window.location.reload();
  }


const elapsedTime = startTime !== null ? (Date.now() - startTime) / 1000 / 60 : 0;


  

console.log(Date.now() - startTime)
const decimalMinutes = elapsedTime.toFixed(2);
const spacecon = words.length / 5;
const wordCount = (charnum + spacecon) / 5;


const wpm = Math.ceil((wordCount / decimalMinutes));



  return (
    <div className="Conts">
      <div className="textA">
      <h2 className='cursor'>start typing...</h2>
      
      {visible && <p className="pew">YOU TYPED {wpm} WPM!</p>}
      {!visible && <p className="pew">{wpm === Infinity ? 0 : wpm} WPM</p>}
        <ul className="ulize">
          
          {words.map((word, i) => (
            <li className="dalist" key={i}>
              {word.split('').map((letter, j) => {
                const isTyped = i < currentWordIndex || (i === currentWordIndex && j < typedLetters.length);
                const isCorrect = isTyped && letter === typedLetters[j];
          
                const isCompletedWord = i < currentWordIndex;
                const letterClass = isCompletedWord ? 'completed2' : isCorrect ? 'typed' : isTyped ? 'incorrect' : '';
                return (
                  <span key={j} className={`letter ${letterClass} `}>
                    {letter}
                  </span>
                );
              })}
            </li>
          ))}
        </ul>
        <button className="btna" type="reset" onClick={RestartButton}>↻</button>
        <input className="inp" type="text" value="inputValue" onKeyDown={handleChange} />
      </div>
    </div>
  );
}

export default App;
