export const randomWord = (words : string[]): string => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex]
}