import React, { useState, useEffect } from 'react';

function Timer(props) {
  const [seconds, setSeconds] = useState(15);
  const [hseconds, setHSeconds] = useState(15);
  const [isActive, setIsActive] = useState(true);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let interval = null;
    // still showing timer and there is time left: decrement timer
    if (isActive && seconds > 0 && !props.addStart) {
      interval = setInterval(() => {
        console.log("reg timer");
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }

    // user finished monitoring task within time or additional started: stop timer
    if (props.mdone || props.addStart) {
      setIsActive(false);
    }

    // still showing timer and there is no time left: stop timer
    else if (isActive && seconds == 0){
      alert("Please sort bag into a bin.");
      setIsActive(false);
      props.setmdone(true);
      props.setTimerOk(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // timer for 15 secs regardless of what shows up on UI
  useEffect(() => {
    let interval2 = null;
    // still showing timer and there is time left: decrement timer
    if (isCounting && hseconds > 0) {
      interval2 = setInterval(() => {
        console.log("hidden timer");
        setHSeconds(hseconds => hseconds - 1);
      }, 1000);
    }

    // still showing timer and there is no time left: stop timer
    if (isCounting && hseconds == 0){
      setIsCounting(false);
      console.log("hidden timer done");
      props.setTimerOk(false);
    }

    return () => clearInterval(interval2);
  }, [isCounting, hseconds]);

  return (
    <div className="app">
      <div className="timer">
        <h1>{seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;