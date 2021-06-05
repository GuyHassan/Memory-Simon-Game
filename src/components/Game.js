import React, { useState, useEffect } from 'react';
import './globalStyle.css';


const Game = () => {
    const [circles, setCircles] = useState(['A', 'B', 'C', 'D', 'E', 'F'].map(val => ({ val, isOn: false })))
    const [userName, setUserName] = useState('')
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    const [prevBulbs, setPrevBulbs] = useState([Math.floor(Math.random() * 5)])

    const [round, setRound] = useState(1)

    const [canPlay, setCanPlay] = useState(false)
    const [winLose, setWinLose] = useState({ win: false, lose: false })

    const createCircles = (arrCircle) => {
        return circles.map(({ val, isOn }, i) => {
            // ${isOn ? 'on' : ''}
            const randomColor = '#' + Math.random().toString(16).substr(2, 6)
            return <div className={`circle`} style={{ backgroundColor: `${isOn ? randomColor : ''}` }} onClick={onClickC(i)} key={val} ></div>
        })

    }
    const onClickC = i => () => {
        if (!canPlay) return

        if (prevBulbs[round - 1] === i) {
            if (round === prevBulbs.length) {
                // console.log('user Win');
                setCanPlay(false)
                setWinLose(p => ({ ...p, win: true }))
                setCurrentScore(p => p + 10)
                setPrevBulbs(p => [...p, Math.floor(Math.random() * 6)])
            }
            setRound(p => p + 1)
            return
        } else {
            setWinLose(p => ({ ...p, lose: true }))
            // console.log('you lost')
        }

    }

    const toggleLights = (n = 1) => {
        if (!n) {
            setCanPlay(true)
            return
        }

        const rand = prevBulbs[prevBulbs.length - n]

        setCircles(p => p.map((val, i) => i === rand ? { ...val, isOn: true } : val))

        setTimeout(() => {
            setCircles(p => p.map((val, i) => i === rand ? { ...val, isOn: false } : val))
            toggleLights(n - 1)
        }
            , 1000)
    }

    const onClickPlayAgain = () => {
        setWinLose({ win: false, lose: false })
        setCanPlay(false)
        if (currentScore > bestScore)
            setBestScore(currentScore)
        setCurrentScore(0)
        setPrevBulbs([Math.floor(Math.random() * 6)])
    }

    useEffect(() => {
        console.log(prevBulbs);
        setTimeout(() => {
            setWinLose({ win: false, lose: false })
        }, 1000)

        toggleLights(round + 1)
        setRound(1)
    }, [prevBulbs])


    useEffect(() => {
        const { userName } = JSON.parse(localStorage.getItem('userName'))

        setUserName(userName)
    }, [])

    return (
        <div className="game">
            <div className="content">
                <h1>Memory "Simon" Game</h1>
                <h2>Player: <span>{userName}</span></h2>
                <h2>{`Current Score: ${currentScore}`}</h2>
                <h2>{`Best Score: ${bestScore}`}</h2>
                <p>You need to remember the sequence of lit circles and click on them.</p>
            </div>

            <div className="wrap-circle">

                {createCircles()}
                {winLose.win && <h1>Good Job !</h1>}
                {
                    winLose.lose &&
                    <div className="play-again">
                        <h1>You Lost !</h1>
                        <button onClick={onClickPlayAgain}>Play Again</button>
                    </div>
                }
            </div>


        </div>
    )
}
export default Game;