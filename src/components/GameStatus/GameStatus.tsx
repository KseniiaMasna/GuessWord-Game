import './GameStatus.css';
import clsx from 'clsx';

interface GameStatusProps {
    status: 'win' | 'lose'
}

export const GameStatus = ({status} : GameStatusProps) => {
    const statusClass = clsx('game-status',{        
        won: status === 'win',
        lost: status === 'lose'
    })

    return (
        status === 'win' 
            ?(
                <section className={statusClass}>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </section>
            ) 
            : (
                <section className={statusClass}>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </section>
            )  
        
    )
}