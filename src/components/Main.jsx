import { useState , useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import Die from "./Die";

function Main() {

    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const allValue = dice.every(die => die.value === dice[0].value);
        if (allHeld && allValue)
            setTenzies(true);
    }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice () {
        const newDice = [];
        for (let i = 0; i < 10; i++)
            newDice.push(generateNewDie())
        return newDice
    }

    const rollDice = () => {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }
        else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setDice(prevDice =>
            prevDice.map(die => {
                return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
            }) 
        )
    }

    const dieElements = dice.map(die => <Die key={die.nanoid} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    )

    return (
        <div className="main">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieElements}
            </div>
            <button onClick={rollDice}>{ tenzies ? 'New Game' : 'Roll' }</button>
        </div>
    )
}

export default Main