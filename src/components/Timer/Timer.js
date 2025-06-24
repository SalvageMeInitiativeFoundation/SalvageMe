import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialSeconds }) {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const format = (value) => (value < 10 ? `0${value}` : value);

    return `${format(days)} Days : ${format(hours)} hours : ${format(minutes)} mins : ${format(seconds)}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(initialSeconds);
  };

  return (
    <div style={{margin: "30px 0"}}>
      <div><h1>{formatTime(remainingTime)}</h1></div>
    </div>
  );
}

export default CountdownTimer;
