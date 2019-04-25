import React, { useState, useEffect } from "react";
import { Progress } from "./Progress";
import { format, addMilliseconds } from "date-fns";

const TOTAL_TIME = 0.5 * 60 * 1000;
export function Timer() {
  const [totalTime, setTotalTime] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [endTime, setEndTime] = useState(null);
  const handleToggle = () => {
    const now = new Date();
    if (!isRunning) {
      setEndTime(addMilliseconds(now, timeLeft));
      setIsRunning(true);
    } else {
      setTimeLeft(endTime - now);
      setIsRunning(false);
    }
  };
  const handleReset = () => {
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setEndTime(null);
    setTotalTime(TOTAL_TIME);
  };

  useEffect(() => {
    let timer;
    if (timeLeft <= 0) {
      handleReset();
    } else if (isRunning) {
      timer = setTimeout(() => {
        setTimeLeft(endTime - new Date());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, endTime]);

  const text = format(addMilliseconds(new Date(0), timeLeft), "mm:ss");
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <div style={{ display: "inline-block" }}>
      <Progress
        width={200}
        height={200}
        strokeWidth={25}
        fontSize={30}
        percentage={percentage}
        text={text}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleToggle}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
