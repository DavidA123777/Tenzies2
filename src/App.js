import React from "react";
import Dice from "./components/Dice";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
const App = () =>{

const [dice, setDice] = React.useState(allNewDice());
const [tenzies, setTenzies] = React.useState(false);
const [rolls, setRolls] = React.useState(0);

React.useEffect(() => {
    let num = 10;
    for (let i = 0; i < dice.length; i++){
        if (dice[i].isHeld === false){
            num--;
        }
    }
    if (num === 10){
        setTenzies(prevState => !prevState);
    }
   
}, [dice])


    function  allNewDice() {
        let newDice = [];
        for (let i = 0; i < 10; i++){
            newDice.push(generateNewDice())
        }
        return newDice;
    }
    
    function generateNewDice(){
        return {value: Math.ceil(Math.random() *6), 
            isHeld: false, 
            id: nanoid()
          }
    }

    const rollDice = () =>{
        if (tenzies){
            setTenzies(prevState => !prevState);
            setDice(allNewDice());
            setRolls(0);

        }
        else{
        setDice(oldDice => oldDice.map((item) =>{
           return item.isHeld ? item : generateNewDice()
        }))
        setRolls(prevState => prevState + 1);
    }

    }
    const holdDice = (id) =>{
        setDice(oldDice => oldDice.map(item => {
            return item.id === id ? {...item, isHeld: !item.isHeld} : item;
        }))




    }
    let diceElements = dice.map((item) => <Dice holdDice={()=> holdDice(item.id)} isHeld={item.isHeld}key={item.id}value={item.value} />)


    return(
        <main>
            {tenzies && <h1>You Won! It took {rolls} rolls to win</h1>}
            {tenzies && <Confetti />}
            <div className="container">
                <h1 className="title">Tenzies</h1>
                <p className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                   {diceElements}
                </div>
                <button onClick={rollDice}className="roll-btn">{tenzies ? "New Game" : "Roll"}</button>
            </div>



        </main>
    )
}
export default App;