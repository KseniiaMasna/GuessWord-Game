import './SecretWord.css'
import { SecretLetter } from '../../types/types'

interface SecretWordProps {
    word: SecretLetter[];
}

export const SecretWord = ({ word }: SecretWordProps) => {

    const hashedWord = word.map((letter, index) => {
        return <span key={index}>{letter.isRevealed ? letter.id : '*'}</span>
    })
    return (
        <div className='secretWord'>
            <h1>{hashedWord}</h1>
        </div>
    )
}

