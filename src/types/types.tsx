export interface LetterType {
    value: string
    id: string
    isHeld: boolean
    isRevealed: boolean
}

export interface SecretLetter extends LetterType {
    isRevealed: boolean
}

export interface Language {
    name: string;
    backgroundColor: string;
    color: string;
}
