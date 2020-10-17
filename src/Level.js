import React, { useEffect, useState } from 'react';
import './App.css';
import ShowImage from './ShowImage';
import Counting from './Counting';
import Monitoring from './Monitoring';
import Timer from './Timer';
import { writeM, writeC } from './LogData';

function Level(props) {
  
  const types = ["Fragile", "Normal", "Oversize"];
  const rand = Math.round(Math.random() * 2);
  const trial_count = 3;

  const [monitoringDone, setMonitoring] = useState(false);
  const [countingDone, setCounting] = useState(false);
  const [imgs, setImgs] = useState([props.images[0].file, props.images[1].file]);
  
  const [key,setKey] = useState(0);
  const [rand_bag, setBag] = useState(types[rand]);

  const [mResult, setMResult] = useState({});
  const [cResult, setCResult] = useState({});

  const [time, setTime] = useState(Date.now());
  const [mTime, setMTime] = useState(Date.now());


  function getRandomBag(){
    const types = ["Fragile", "Normal", "Oversize"];
    let random_index = Math.round(Math.random() * 2);
    while(rand_bag == types[random_index]){
        random_index = Math.round(Math.random() * 2);
    }
    setBag(types[rand])
    return types[rand];
  }

  useEffect(()=>{
    if(countingDone){
      const myIndex = cResult.choice;
      let counting_entry = writeC(props.levelType, props.trials, cResult.duration, props.images[props.trials].file, cResult.choice, rand_bag, cResult.count, props.startData[myIndex]);
      props.setCData([...props.cdata, counting_entry]);
    }
    else if(monitoringDone){
      const hadAdd = mResult.wrong == -1 ? "False":"True";
      const count = mResult.wrong >=0 ? mResult.wrong:"";
      let monitoring_entry = writeM(props.levelType, props.trials, mResult.duration, mResult.duration < 15000, props.images[props.trials].file, mResult.count, hadAdd, count);
      props.setMData([...props.mdata, monitoring_entry]);
    }
    
    if(monitoringDone && countingDone){
      setMonitoring(false);
      setCounting(false);
      
      setKey(key+2);
      props.setTrials(props.trials+1);
      if(props.trials < trial_count){
        getRandomBag();
      }
    }
    
  }, [monitoringDone, countingDone]);

  useEffect(()=>{
    setTime(Date.now());

    if(props.trials == trial_count){
      props.nextLevel(true);

    }
    if(props.levelType == 3 || props.levelType == 92){
      const path1 = props.images[2*props.order[props.trials]].path;
      const path2 = props.images[2*props.order[props.trials]+1].path;
      setImgs([props.images[2*props.order[props.trials]].file, props.images[2*props.order[props.trials]+1].file]);
      if(path1.substring(3,path1.indexOf("_")) != path2.substring(3,path2.indexOf("_"))){
        setImgs([props.images[2*props.order[props.trials]].file, props.images[2*props.order[props.trials]+1].file]);
      }
    }
  }, [props.trials]);

  function blinkingImage(){
    if (props.levelType == 1 || props.levelType == 91){
        return (<img className="image_style"
          src={props.images[props.trials].file}
          alt="single image"
        />)
    }
    else{
        return(<ShowImage key={key+1} images={imgs}></ShowImage>)
    }
  }

  function getWeaponCount(){
    return props.images[props.trials].weapons;
  }

  function isHighlight(){
    if (props.levelType == 91 || props.levelType == 92){
      return true;
    }
    return false;
  }

  return (
    <div className="task_style">
      <div className="img_side">
      <Timer key={props.trials}></Timer>
      {blinkingImage()}
    
    <h2 className="bag_style">{rand_bag}</h2>
  
    </div>
    <Monitoring 
      key={props.trials} 
      weaponCount = {getWeaponCount()} 
      highlightOk={isHighlight()} 
      completed={setMonitoring} 
      result={setMResult}
      time={time}
      setMTime={setMTime}
      trials={props.trials}
      correctAdd={props.startData.pattern}
    />
    <Counting 
      key={"L"+props.levelType} 
      mDone={monitoringDone}
      completed={setCounting} 
      result={setCResult}
      time={mTime}
    />
    </div>
  );
}

export default Level;
