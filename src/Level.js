import React, { useEffect, useState } from 'react';
import './App.css';
import ShowImage from './ShowImage';
import Counting from './Counting';
import Monitoring from './Monitoring';
import Timer from './Timer';
import { writeM } from './LogData';


function Level(props) {
  const types = ["Fragile", "Normal", "Oversize"];
  const rand = Math.round(Math.random() * 2);

  const [monitoringDone, setMonitoring] = useState(false);
  const [countingDone, setCounting] = useState(false);
  const [imgs, setImgs] = useState([props.images[0].file, props.images[1].file]);
  
  const [key,setKey] = useState(0);
  const [rand_bag, setBag] = useState(types[rand]);

  const [mResult, setMResult] = useState({});
  const [cResult, setCResult] = useState({});


  function getRandomBag(){
    const types = ["Fragile", "Normal", "Oversize"];
    const rand = Math.round(Math.random() * 2);
    setBag(types[rand]);
  }

  useEffect(()=>{
    if(monitoringDone && countingDone){
      //React.cloneElement(Monitoring, )
      setMonitoring(false);
      setCounting(false);
      setImgs([props.images[2*props.trials].file, props.images[2*props.trials+1].file]);
     
      setKey(key+2);
      props.setTrials(props.trials+1);
      getRandomBag();
    }
  }, [monitoringDone, countingDone]);

  useEffect(()=>{
    if(props.trials == 3){
        props.nextLevel(true);
      console.log("done with task", props.levelType, props.images);

    }
  }, [props.trials]);

  useEffect(()=>{
    console.log("got mresults back", mResult);
    writeM(props.levelType, props.trials, 0, false, props.images[props.trials].file, mResult.count, false, 0);
  },[mResult]);

  useEffect(()=>{
    console.log("got cresults back", cResult);
    //writeC(level, trial, duration, image, choice, correct, currentCount, capacity);
  },[cResult]);

  useEffect(()=>{
    console.log("starting new level cue transitions");
  },[props.levelType]);

  function blinkingImage(){
    if (props.levelType == 1 || props.levelType == 91){
        return (<img className="image_style"
          src={props.images[props.trials].file}
          alt="single image"
        />)
    }
    else{
        console.log("sending these",imgs);
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
    <Monitoring key={props.trials} weaponCount = {getWeaponCount()} highlightOk={isHighlight()} completed={setMonitoring} result={setMResult}></Monitoring>
    <Counting key={"L"+props.levelType} completed={setCounting} result={setCResult}></Counting>
    </div>
  );
}

export default Level;
