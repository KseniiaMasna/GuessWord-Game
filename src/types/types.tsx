export interface LetterType {
    value: string
    id: string
    isHeld: boolean
    isRevealed: boolean
}

export interface SecretLetter extends LetterType {
    isRevealed: boolean
}
