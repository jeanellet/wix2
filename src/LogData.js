import React from 'react';

// signature for writing monitoring tasks
export const writeM = (level, trial, duration, onTime, image, choice, addScreen, wrongAdd)=>{
    var entry = {
        Level: level,
        Action: "Monitoring",
        Trial: trial,
        OnTime: onTime,
        Duration: duration,
        ImagePath: image,
        WeaponChoice: choice,
        Additional_Screening: addScreen,
        Wrong_Selection: wrongAdd
    }
    return entry;
}

export const writeC = (level, trial, duration, image, choice, correct, currentCount, capacity) =>{
    var entry = {
        Level: level,
        Action: "Counting",
        Trial: trial,
        Duration: duration,
        ImagePath: image,
        BinChoice: choice,
        CorrectBin: correct,
        BinCount: currentCount,
        BinCapacity: capacity
    }
    return entry;
}
