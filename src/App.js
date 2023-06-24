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



  const handleChange = (event) => {

    if (words.length === 0 || currentWordIndex >= words.length) {
      return;
    }
    const typedValue = event.target.value;
    setInputValue(typedValue);
    console.log(typedValue)
    // Check if the typed value matches the current word up to the typed length
    if (typedValue === words[currentWordIndex].slice(0, typedValue.length)) {
      setTypedLetters(typedValue);
  
      // Check if the entire word has been typed correctly
      if (typedValue === words[currentWordIndex]) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setTypedLetters('');
        setNumVal((prevNumVal) => prevNumVal + 1);
        setInputValue('');
      }
    } else {
      setTypedLetters(typedValue);
    }
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      
      if (event.key === 'Backspace') {

        setInputValue((prevInputValue) => {
          const updatedValue = prevInputValue.slice(0, -1);
          handleChange({ target: { value: updatedValue } });

        
      }); }
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
    fetch('https://random-word-api.vercel.app/api?words=25')
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
console.log(inputValue);



  return (
    <div className="Conts">
      <div className="textA">
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
        {visible && <p className="pew">You got all the words!</p>}
        <input className="inp" type="text" onKeyDown={handleChange} />
      </div>
    </div>
  );
}

export default App;
