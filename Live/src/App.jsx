import { useEffect, useRef, useState } from "react";

export default function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          alert("Time's Up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => {
    const total = minutes * 60 + seconds;
    if (total <= 0) return;
    setTimeLeft(total);
    setIsRunning(true);
  };

  const pauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = () => {
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>⏳ Countdown Timer</h2>

      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(+e.target.value)}
      />
      <input
        type="number"
        placeholder="Seconds"
        value={seconds}
        onChange={(e) => setSeconds(+e.target.value)}
      />

      <h3>{formatTime()}</h3>

      <button onClick={startTimer}>Start</button>
      <button onClick={pauseResume}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
