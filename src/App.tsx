import './App.css'
import { useState, useEffect } from 'react'
import { Header } from './components/Header/Header'
import { Letter } from './components/Letter/Letter'
import { SecretWord } from './components/SecretWord/SecretWord'
import { LetterType } from './types/types'
import { SecretLetter } from './types/types'

const myWord: string = 'secret'
const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('')
const letters: LetterType[] = alphabet.map(letter => {
  return {
    value: letter,
    id: letter,
    isHeld: false,
    isRevealed: false
  }
})

const secretWord: SecretLetter[] = myWord.split('').map(letter => {
  return {
    value: letter,
    id: letter,
    isHeld: false,
    isRevealed: false
  }
})

const initialAttempts: number = 7




function App() {
  const [attempts, setAttempts] = useState<number>(initialAttempts)
  const [secretLetters, setSecretLetters] = useState(secretWord)
  const [keyBoard, setKeyBoard] = useState(letters)

  const gameOver = secretLetters.every(letter => letter.isRevealed) || attempts === 0


  

  
  const keyboardElements = keyBoard.map(letter => <Letter
    value={letter.value}
    key={letter.id}
    id={letter.id}
    isHeld={letter.isHeld}
    isRevealed = {letter.isRevealed}
    isEnabled = {!letter.isHeld && !gameOver}
    onClick={() => !gameOver && pickLetter(letter.id)} />
  )

  const holdLetter = (id: string, isGuessed: boolean) => {
    setKeyBoard(prev => prev.map(letter => 
      letter.id === id 
        ? {...letter, isHeld: true, isRevealed: isGuessed}
        : letter        
    ))
  }


  const pickLetter = (id: string) => {
    let isGuessed:boolean = false
    const updatedSecretLetters = secretLetters.map(letter => {
      if(letter.id === id){
         isGuessed = true
         return { ...letter, isRevealed: true } 
      } else {
        return letter
      }
    })
    setSecretLetters(updatedSecretLetters)
    if (!isGuessed) {
      setAttempts(attempts - 1)
      console.log('wrong')
    } else if (isGuessed){
      console.log('right')
    }
    holdLetter(id, isGuessed)
  }

  const startNewGame = () => {
    setAttempts(initialAttempts)
    setSecretLetters(secretWord)
    setKeyBoard(letters)
  }

  return (
    <>
      <Header />
      <main>
        <SecretWord word={secretLetters}/>
        <div className='keyboard'>
              {keyboardElements}
        </div>
        {gameOver && 
          <>
            <h1>{attempts === 0 ? 'Game Over' : 'You Win'}</h1>    
            <button onClick={startNewGame}>New Game</button>
          </>    
        }
      </main>
    </>
  )
}

export default App
