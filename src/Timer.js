import React, { useState, useEffect } from 'react';

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    if (seconds == 15 || props.mdone) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="timer">
        <h1>{seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;