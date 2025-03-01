import './App.css'
import clsx from 'clsx';
import Confetti from 'react-confetti'
import  {words}  from './assets/words'
import {randomWord} from './utils'
import { useState } from 'react'
import { Header } from './components/Header/Header'
import { Letter } from './components/Letter/Letter'
import { SecretWord } from './components/SecretWord/SecretWord'
import { LetterType } from './types/types'
import { SecretLetter } from './types/types'
import { GameStatus } from './components/GameStatus/GameStatus'
import { languages } from './assets/languages'

//Static value
const myWord: string = randomWord(words)
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



function App() {
  // State values
  const [attempts, setAttempts] = useState<number>(languages.length - 1)
  const [secretLetters, setSecretLetters] = useState(secretWord)
  const [keyBoard, setKeyBoard] = useState(letters)

  // Derived values
  const gameOver = secretLetters.every(letter => letter.isRevealed) || attempts === 0
  const gameWon = secretLetters.every(letter => letter.isRevealed) 


  const languageElements = languages.map((language, index) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }

    const lostLanguagesCount = languages.length - attempts
    const isLost = index < lostLanguagesCount

    const className = clsx({
      chip: true,
      lost: isLost
    })

    return (
      <span 
        className={className}
        style={styles} 
        key={language.name}>
        {language.name}
      </span>
    )
  })
  
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
    setAttempts(languages.length - 1)
    setSecretLetters(secretWord)
    setKeyBoard(letters)
  }

  return (
    <>
      <Header />
      {
        gameOver 
        
        ? <GameStatus status={attempts === 0 ? 'lose' : 'win'}/>
        : <section className='game-status'></section>
      }

      <main>
        <section className="language-chips">
          {languageElements}
        </section>
        <SecretWord 
          word={secretLetters}
          gameOver = {gameOver}/>
        <section className='keyboard'>
              {keyboardElements}
        </section>
        {gameOver && <button className='new-game' onClick={startNewGame}>New Game</button>}
        {gameWon && <Confetti className="w-screen h-screen"/>}
      </main>
    </>
  )
}

export default App
