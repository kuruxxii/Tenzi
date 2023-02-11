import React from "react"
import Die from "./Die"
import Dashboard from "./Dashboard"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    
    /* 
    possible expansions:
    - CSS: put real dots on the dice
    - track the number of rolls
    - track the time it took to win
    - save your best time to local storage
    */

    const [startTime, setStartTime] = React.useState(0)
    const [duration, setDuration] = React.useState("")
    const [tenzies, setTenzies] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    const [numOfClicks, setNumOfClicks] = React.useState(0)
    const [numOfRolls, setNumOfRolls] = React.useState(0)

    function now() {
        let moment = new Date()
        return moment.getTime() / 1000 // typeof now() => number
    }

    // is this game won?
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setDuration((now() - startTime).toFixed(1))
            setStartTime(0)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        setNumOfRolls(prev => prev + 1)
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setNumOfRolls(0)
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        if (numOfClicks === 0) {
            setStartTime(now())
        }
        setNumOfClicks(prev => prev + 1)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            {tenzies && <Dashboard numOfRolls={numOfRolls} duration={duration}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}