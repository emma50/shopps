import { useState, useEffect } from 'react'
import styles from './countdown.module.scss'
import { calculateDifference } from './utils'

const initialState = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
}

export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime())
  const [timeRemaining, setTimeRemaining] = useState(initialState)

  useEffect(() => {
    setTimeout(date.getTime())
  }, [date])

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeRemaining(timeInMs)
    },1000)

    return () => clearInterval(interval)
  }, [timeInMs])

  const updateTimeRemaining = (timeInMs) => {
    setTimeRemaining(calculateDifference(timeInMs))
  }
  return (
    <div className={styles.countdown}>
      <span>{timeRemaining.days}</span>
      <b>:</b>
      <span>{timeRemaining.hours}</span>
      <b>:</b>
      <span>{timeRemaining.minutes}</span>
      <b>:</b>
      <span>{timeRemaining.seconds}</span>
    </div>
  )
}
