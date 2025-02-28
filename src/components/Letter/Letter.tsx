import './Letter.css'
import { LetterType } from '../../types/types'


interface LetterProps extends LetterType {
    onClick: () => void
    isEnabled: boolean
}

export const Letter = ({value, id, isHeld, isRevealed, isEnabled,  onClick} :LetterProps) => {
    return (
        <button className={`letter ${isHeld ? 'held' : ''} ${isRevealed ? 'revealed' : ''}`} onClick={isEnabled ? onClick : undefined} id={id} disabled={!isEnabled}>
            {value}                        
        </button>
    )
}