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
  const capacities ={
    "Fragile":3,
    "Normal":3,
    "Oversize":3
  };

  const [monitoringDone, setMonitoring] = useState(false);
  const [countingDone, setCounting] = useState(false);
  const [imgs, setImgs] = useState([props.images[0].file, props.images[1].file]);
  
  const [key,setKey] = useState(0);
  const [rand_bag, setBag] = useState(types[rand]);

  const [mResult, setMResult] = useState({});
  const [cResult, setCResult] = useState({});


  function getRandomBag(){
    const types = ["Fragile", "Normal", "Oversize"];
    let random_index = Math.round(Math.random() * 2);
    console.log(rand);
    while(rand_bag == types[random_index]){
        random_index = Math.round(Math.random() * 2);
    }
    setBag(types[rand])
    return types[rand];
  }

  useEffect(()=>{
    if(countingDone){
      let counting_entry = writeC(props.levelType, props.trials, 0, props.images[props.trials].file, cResult.choice, rand_bag, cResult.count, capacities[cResult.choice]);
      props.setCData([...props.cdata, counting_entry]);
      console.log("AAA");
      console.log(props.cdata);
    }
    else if(monitoringDone){
      let monitoring_entry = writeM(props.levelType, props.trials, 0, false, props.images[props.trials].file, mResult.count, false, 0);
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
    if(props.trials == trial_count){
      props.nextLevel(true);
      console.log("done with task", props.levelType, props.images);

    }
    if(props.levelType == 3 || props.levelType == 92){
      const path1 = props.images[2*props.order[props.trials]].path;
      const path2 = props.images[2*props.order[props.trials]+1].path;
      setImgs([props.images[2*props.order[props.trials]].file, props.images[2*props.order[props.trials]+1].file]);
      console.log(path1.substring(3,path1.indexOf("_")),path2.substring(3,path2.indexOf("_")));
      if(path1.substring(3,path1.indexOf("_")) != path2.substring(3,path2.indexOf("_"))){
        console.log("mismatched")
        setImgs([props.images[2*props.order[props.trials]].file, props.images[2*props.order[props.trials]+1].file]);
      }
    }

  }, [props.trials]);

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
