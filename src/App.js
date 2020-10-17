import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import './App.css';
import Level from './Level';
import Start from './Start';

function App() {

  const LOA1Imgs = require.context('./LOA_1/', true, /\.png$/);
  const LOA1 = LOA1Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {path, file: LOA1Imgs(path), id: path.substring(3,imgId), weapons:path.substring(correctNum+1,correctNum+2)};
  });

  const LOA3Imgs = require.context('./LOA_3/', true, /\.png$/);
  const LOA3 = LOA3Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {path, file: LOA3Imgs(path), id: path.substring(3,imgId), weapons:path.substring(correctNum+1,correctNum+2)};
  });

  const LOA91Imgs = require.context('./LOA_9/LOA_9_1/', true, /\.png$/);
  const LOA91 = LOA91Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {path, file: LOA91Imgs(path), id: path.substring(3,imgId), weapons:path.substring(correctNum+1,correctNum+2)};
  });

  const LOA92Imgs = require.context('./LOA_9/LOA_9_2/', true, /\.png$/);
  const LOA92 = LOA92Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {path, file: LOA92Imgs(path), id: path.substring(3,imgId), weapons:path.substring(correctNum+1,correctNum+2)};
  });

  const addImgs = require.context('./Additional_Screening', true, /\.jpg$/);
  const addimgs = addImgs.keys().map(path=>{return {path, file: addImgs(path)}});

  const [startData, setStart] = useState({});
  const [mData, setMData] = useState([]);
  const [cData, setCData] = useState([]);
  const [nextLevel, setNext] = useState(false);
  const [levelIndex, setLevel] = useState(0);
  const [trials, setTrials] = useState(0);
  const [transitionDone, setTransition] = useState(false);
  const order = [1, 3, 91, 92];
  const images = [LOA1, LOA3, LOA91, LOA92];

  useEffect(()=>{
    if(nextLevel == true){
        setLevel(levelIndex + 1);
        setTrials(0);
        setNext(false);
        setTransition(false);
    }
  }, [nextLevel]);

  useEffect(()=>{
    getDisplay();
  }, [transitionDone]);

  function getOrder(){
    let array = [];

    for(var i=0;i<images[levelIndex].length/2;i++){
      array.push(i);
    }
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  function getDisplay(){
    if(levelIndex <= 3){
      if(transitionDone){
        return <Level 
          mdata={mData}
          setMData={setMData} 
          cdata={cData}
          setCData={setCData} 
          order={getOrder()} 
          images={images[levelIndex]} 
          trials={trials} 
          setTrials={setTrials} 
          nextLevel={setNext} 
          levelType={order[levelIndex]}
          startData={startData}
        ></Level>
      }
      else{
        return <Start levelIndex={levelIndex} startData={startData} setStart={setStart} setTransition={setTransition}></Start>
      }
      
    }
    else{
      let allData = mData.concat(cData);
      return (
        <CSVLink filename='test.csv' data={allData}>
          Download
        </CSVLink>
      );
    }
  }

  return (
    <div>
      {getDisplay()}
    </div>

  );
}

export default App;
