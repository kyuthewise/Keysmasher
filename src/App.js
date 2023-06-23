import React from 'react';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {


  let index = 0;
  const[words, setWords] = useState([]);
  const[numVal, setnumVal] = useState(0);
const [inputValue, setInputValue] = useState('');
const [currentWordIndex, setCurrentWordIndex] = useState(0);
const handleChange = (event) => {
  const typedValue = event.target.value;
  setInputValue(typedValue);

  // Check if the typed value matches the current word up to the typed length
  if (typedValue === words[currentWordIndex].slice(0, typedValue.length)) {
    setTypedLetters(typedValue);

    // Check if the entire word has been typed correctly
    if (typedValue === words[currentWordIndex]) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setTypedLetters('');
      console.log('yuh');
      setnumVal(numVal + 1);
      
      setInputValue('');
    }
  } else {
    setTypedLetters(typedValue);
  }
};

console.log(numVal);
const [completedWords, setCompletedWords] = useState([]);
const[typedLetters, setTypedLetters] = useState('');
const Bloo = () => {
const[index, setIndex] = useState(0);



 }


Bloo();


  const fetchUserData = () => {
    fetch("https://random-word-api.vercel.app/api?words=25")
    .then(response => {
      return response.json()
    }).then (data =>{
      setWords(data)
    })
  }


  useEffect(() => {
    fetchUserData()
  }, [])
  
  const [visibl, setVisible] = useState(false);

  
  useEffect(() => {
  if (numVal == words.length){
    console.log('compls');
    setVisible(true);
  
  }
  else{
    setVisible(false)
  }
  
  }, [numVal, words])
  console.log(visibl)

  console.log(words.length)



  return (
<div className='Conts'>
<div className ="textA">
<ul className='ulize'>
{words.map((word, i) => (
  <li className="dalist" key={i}>
    {word.split('').map((letter, j) => {
      const isTyped = i < currentWordIndex || (i === currentWordIndex && j < typedLetters.length);
      const isCorrect = isTyped && letter === typedLetters[j];
      const isCompletedWord = i < currentWordIndex;
      const letterClass = isCompletedWord ? 'completed2' : isCorrect ? 'typed' : isTyped ? 'incorrect' : '';
      return (
        <span
          key={j}
          className={`letter ${letterClass} `}
        >
          {letter}
        </span>
      );
    })}
  </li>
))}



 </ul>
 {visibl && <p class="pew">You got all the words!</p>}
 <input className="inp" type="text" value={inputValue} onChange={handleChange}></input>


</div>
</div>
    
    
  );
}

export default App;
