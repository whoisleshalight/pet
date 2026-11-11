import { useEffect, useState } from 'react'
import styles from './LocalClock.module.scss'

interface LocalClockProps {
  city?: string
  countryCode?: string
  timeZone?: string
  hour12?: boolean
  className?: string
}

const millisecondsPerMinute = 60_000

export function LocalClock({
  city = 'Kyiv',
  countryCode = 'UA',
  timeZone = 'Europe/Kyiv',
  hour12 = true,
  className,
}: LocalClockProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    let timeoutId: number

    function scheduleNextMinute() {
      const delay = millisecondsPerMinute - (Date.now() % millisecondsPerMinute)

      timeoutId = window.setTimeout(() => {
        setCurrentDate(new Date())
        scheduleNextMinute()
      }, delay)
    }

    scheduleNextMinute()

    return () => window.clearTimeout(timeoutId)
  }, [])

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  }).format(currentDate)
  const clockClassName = className
    ? `${styles.clock} ${className}`
    : styles.clock

  return (
    <span className={clockClassName}>
      <span className={styles.location}>{city}, {countryCode}</span>
      <time className={styles.time} dateTime={currentDate.toISOString()}>
        {formattedTime}
      </time>
    </span>
  )
}
