import React from 'react';

// signature for writing monitoring tasks
export const writeM = (level, trial, duration, onTime, image, choice, addScreen, wrongAdd)=>{
    console.log("writing monitoring to data", choice);
}

export const writeC = (level, trial, duration, image, choice, correct, currentCount, capacity) =>{
    console.log("writing counting to data");
}
