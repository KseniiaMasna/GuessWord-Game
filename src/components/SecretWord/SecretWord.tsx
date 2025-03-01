import './SecretWord.css'
import clsx from 'clsx'
import { SecretLetter } from '../../types/types'

interface SecretWordProps {
    word: SecretLetter[]
    gameOver: boolean
}

export const SecretWord = ({ word, gameOver }: SecretWordProps) => {

    const hashedWord = word.map((letter, index) => {

        let missedLetter: boolean = false
        if (gameOver && !letter.isRevealed){
            missedLetter = true
        } 
        const classSecretLetter = clsx({
            missed: missedLetter
        })

        return (
            <span className={classSecretLetter}
                key={index}>
                {letter.isRevealed || gameOver ? letter.id.toUpperCase() : ''}
            </span>)
    })
    return (
        <section className='secret-word'>
            {hashedWord}  
        </section>
    )
}

