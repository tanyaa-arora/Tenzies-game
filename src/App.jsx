import React, { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';
function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false);
  const [count,setCount]=React.useState(0);
  const [seconds,setSeconds]=React.useState(0);

  React.useEffect(()=>
  {
    const allHeld=dice.every(die=>die.isHeld)
    const firstVal=dice[0].value
    const allSameVal=dice.every(die=>die.value==firstVal)
    if(allHeld && allSameVal){
      setTenzies(true);
      console.log("You won")
    }
},[dice])

React.useEffect(()=>{
    const interval=setInterval(()=>{
      setSeconds(()=>seconds+1)
    },1000)
    // console.log(seconds)
    if(tenzies){
      clearInterval(interval)
    }
    return ()=>clearInterval(interval);//cleanup function cancels the timer when the component is unmounted. 
  }
  ,[seconds])

  //create a function to generate new die as the code becomes repetitive
  //adding the same object again and again.

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());//we can use arr.push or arr[i]=value
    }
    return arr;
  }
  function rollDice() {
    setCount((count)=>count=count+1);
    setDice((oldDie) => oldDie.map(die => {
      return (
        die.isHeld ? die : generateNewDie()
      )
    }));
  }
  function newGame(){
    setDice(()=>allNewDice());
    setTenzies(false);
    setCount(0);
    setSeconds(0);
  }


  function holdDice(id) {
    // console.log(id);
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const tenziesGame=tenzies?"New Game":"Roll";

  React.useEffect(() => allNewDice, [])
  // console.log(dice);
  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <main className='main-styling'>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div>
          {dice.map((element) => {
            return (
              <Die isHeld={element.isHeld} key={element.id} value={element.value} holdDice={() => holdDice(element.id)} />
            )
          })}
        </div>
        <button onClick={tenzies?newGame:rollDice}>{tenziesGame}</button>
        <p>{tenzies?`You won the game in ${count} rolls and ${seconds}s!!`:`Roll:${count}`}</p>
      </main>
    </div>
  )
}

export default App
