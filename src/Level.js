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
  const trial_count = 20;

  const [monitoringDone, setMonitoring] = useState(false);
  const [additionalDone, setAdditional] = useState(false);
  const [countingDone, setCounting] = useState(false);
  const [levelImgSet, setImgSet] = useState(props.images);
  const [imgs, setImgs] = useState([]);
  const [singleImg, setSingle] = useState("");
  
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
      let counting_entry = writeC(props.levelType, props.trials+1, cResult.duration, props.images[props.trials].file, cResult.choice, rand_bag, cResult.count, props.startData[myIndex]);
      props.setCData([...props.cdata, counting_entry]);
    }
    else if(monitoringDone){
      const hadAdd = mResult.wrong == -1 ? "False":"True";
      const count = mResult.wrong >=0 ? mResult.wrong:"";
      let monitoring_entry = writeM(props.levelType, props.trials+1, mResult.duration, mResult.duration < 15000, props.images[props.trials].file, mResult.count, hadAdd, count);
      props.setMData([...props.mdata, monitoring_entry]);
    }
    
    if(monitoringDone && countingDone){
      setMonitoring(false);
      setAdditional(false);
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
    console.log("trial #: ", props.trials);
    if(props.trials == trial_count){
      props.nextLevel(true);

    }
    else if(props.levelType == 3 || props.levelType == 92){
      //get random image index
      var randSpot = Math.round(Math.random() * (levelImgSet.length-1));
      while(!levelImgSet[randSpot].isValid){
        randSpot = Math.round(Math.random() * (levelImgSet.length-1));
      };

      //get corresponding file
      const file1 = levelImgSet[randSpot].file; 
      
      //go through image list for matching pair
      for(var i=0;i<levelImgSet.length;i++){
        if(parseInt(levelImgSet[i].id) ==  parseInt(levelImgSet[randSpot].id) && i != randSpot){
          //get file for match
          const file2 = levelImgSet[i].file;

          //remove pair from image set
          let newSet = levelImgSet.slice();
          newSet[randSpot].isValid = false;
          newSet[i].isValid = false;
          setImgSet(newSet);

          console.log("selected:",file1, file2);
          setImgs([file1, file2]);
          break;
        }
      }
      
    }
    else if(props.levelType == 1 || props.levelType == 91){
      let imgSet = levelImgSet;
      console.log("imgSet:", imgSet);
      var randSpot = Math.round(Math.random() * (levelImgSet.length-1));
      while(!levelImgSet[randSpot].isValid){
        randSpot = Math.round(Math.random() * (levelImgSet.length-1));
      };
      const file1 = imgSet[randSpot].file;

      let newSet = levelImgSet.slice();
      newSet[randSpot].isValid = false;
      setImgSet(newSet);
      setSingle(file1);
    }
  }, [props.trials]);

  useEffect(()=>{
    console.log("levelImgSet: ", levelImgSet);
  }, [levelImgSet]);

  function blinkingImage(){   
    if (props.levelType == 1 || props.levelType == 91){
      return (<img className="image_style"
        src={singleImg}
        alt="single image"
      />)
    }
    else{
        return(<ShowImage key={key+1} images={imgs}></ShowImage>)
    }
  }

  function getWeaponCount(){
    if(props.trials < trial_count){
      return props.images[props.trials].weapons;
    }
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
      <Timer key={props.trials} mdone={monitoringDone}></Timer>
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
      addDone={additionalDone}
      setAdd={setAdditional}
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
