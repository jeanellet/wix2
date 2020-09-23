import React, { useEffect, useState } from 'react';
import './App.css';
import ShowImage from './ShowImage';
import Counting from './Counting';
import Monitoring from './Monitoring';
import Timer from './Timer';

import task_img1 from './LOA_1/B1_3_1.png';
import task_img2 from './LOA_1/B3_1_1.png';
import task_img3 from './LOA_1/B4_1_3.png';
import obj_img from './Objects.png';

function App() {
  const types = ["Fragile", "Normal", "Oversize"];
  const rand = Math.round(Math.random() * 2);

  const LOA1Imgs = require.context('./LOA_1/', true, /\.png$/);
  const LOA1 = LOA1Imgs.keys().map(path=>({path, file: LOA1Imgs(path)}));
  console.log(LOA1);

  const [monitoringDone, setMonitoring] = useState(false);
  const [countingDone, setCounting] = useState(false);
  const [imageIndex, setImgIndex] = useState(2);
  const [imgs, setImgs] = useState([LOA1[0].file, LOA1[1].file]);
  const [seconds, setSeconds] = useState(0);
  const [key,setKey] = useState(0);
  const [toggleOk, setToggle] = useState(1);
  const [rand_bag, setBag] = useState(types[rand]);
  const [trials, setTrials] = useState(0);


  function getRandomBag(){
    const types = ["Fragile", "Normal", "Oversize"];
    const rand = Math.round(Math.random() * 2);
    setBag(types[rand]);
  }

  useEffect(()=>{
    if(monitoringDone && countingDone){
      console.log("next task");
      React.cloneElement(Monitoring, )
      setMonitoring(false);
      setCounting(false);
      setImgs([LOA1[imageIndex].file, LOA1[imageIndex+1].file]);
      setImgIndex(imageIndex+2);
      setKey(key+2);
      setTrials(trials+1);
      getRandomBag();
    }
  }, [monitoringDone, countingDone]);

  useEffect(()=>{
    if(trials == 3){
      console.log("done with task");
    }
  }, [trials]);


  return (
    <div className="task_style">
      <div className="img_side">
      <Timer key={key}></Timer>
    <ShowImage key={key+1} images={imgs} toggleOk={monitoringDone}></ShowImage>
    <h2 className="bag_style">{rand_bag}</h2>
  
    </div>
    <Monitoring key={key} completed={setMonitoring}></Monitoring>
    <Counting completed={setCounting}></Counting>
    </div>
  );
}

export default App;
