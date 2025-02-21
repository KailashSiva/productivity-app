import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";


export default function PomodoroTimer() {

    // work time and rest time are in seconds
    const [workTime, setWorkTime] = useState(50 * 60)
    const [restTime, setRestTime] = useState(5 * 60)

    let timerId = useRef(null);
    const [timeLeft, setTimeLeft] = useState(workTime);

    const [isWorkMode, setIsWorkMode] = useState(true)
    const [isRestMode, setIsRestMode] = useState(false)

    const [isRunning, setIsRunning] = useState(false)

    // display time remaining

    // what to do when timer ends or user pauses timer
    // and changes study or rest time

    // if end study timer
    // 
    useEffect(() => {
        console.log('change')
        console.log(isWorkMode)
        if (isWorkMode) {
            setTimeLeft(workTime);
        } else {
            setTimeLeft(restTime);
        }
    }, [isWorkMode, isRestMode, workTime, restTime]);

    useEffect(() => {
        if (isRunning) {
            timerId.current = setInterval(() => {

                console.log('interval id', timerId.current)
                setTimeLeft((prev) => {
                    console.log(prev)
                    if (prev > 0) {
                        return prev - 1
                    } else {
                        if (isWorkMode) {
                            setIsWorkMode(false)
                            setIsRestMode(true)
                            setTimeLeft(restTime)
                        } else {
                            setIsWorkMode(true)
                            setIsRestMode(false)
                            setTimeLeft(workTime)
                        }

                        setIsRunning(false)
                        clearInterval(timerId.current)
                        return prev
                    }
                })
            }, 1000)
        } else if (timerId.current != null) {
            clearInterval(timerId.current)
        }

        return () => clearInterval(timerId.current)
    }, [isRunning])



    return (
        <div>
            <h1>{isWorkMode ? "Study Session" : "Rest"}</h1>
            <div>
                <label>Work Minutes</label>
                <input
                    type='number'
                    value={Math.floor(workTime / 60) || ''}
                    onChange={(e) => {
                        setWorkTime(Number(e.target.value) * 60)
                        console.log(Number(e.target.value) * 60)
                    }}
                />
            </div>

            <div>
                <label>Rest Minutes</label>
                <input
                    type='number'
                    value={Math.floor(restTime / 60) || ''}
                    onChange={(e) => {
                        setRestTime(Number(e.target.value) * 60)
                        console.log(Number(e.target.value) * 60)
                    }
                    }
                />
            </div>


            <div>
                <button onClick={() => { setIsWorkMode(true); setIsRestMode(false) }}>Get Some Work Done</button>
                <button onClick={() => { setIsWorkMode(false); setIsRestMode(true) }}>Take a break</button>
            </div>
            <div>
                <h2>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>
            </div>

            <button onClick={() => setIsRunning(prev => !prev)}> <FontAwesomeIcon icon={isRunning ? faPause : faPlay} size="3x" /></button>
            <button>Reset Timer</button>


        </div>
    )
}
