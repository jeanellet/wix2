import React, { useEffect, useState, useRef } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import './App.css';
import Level from './Level';
import Start from './Start';

function App() {

  const LOA1Imgs = require.context('./LOA_1/', true, /\.png$/);
  const LOA1 = LOA1Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA1Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA3Imgs = require.context('./LOA_3/', true, /\.png$/);
  const LOA3 = LOA3Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA3Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA91Imgs = require.context('./LOA_9/LOA_9_1/', true, /\.png$/);
  const LOA91 = LOA91Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA91Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA92Imgs = require.context('./LOA_9/LOA_9_2/', true, /\.png$/);
  const LOA92 = LOA92Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA92Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2),
      isValid:true
    };
  });

  const [startData, setStart] = useState({});
  const [mData, setMData] = useState([]);
  const [cData, setCData] = useState([]);
  const [nextLevel, setNext] = useState(false);
  const [levelIndex, setLevel] = useState(0);
  const [trials, setTrials] = useState(0);
  const [transitionDone, setTransition] = useState(false);
  const [user_id, setId] = useState("user");
  const secondFile = useRef(null);
  const order = [1, 3, 91, 92];
  const images = [LOA1, LOA3, LOA91, LOA92];
  console.log("images", images);


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

  function myClick(){
    secondFile.current.link.click();
  }

  function getDisplay(){
    if(levelIndex <= 3){
      if(transitionDone){
        return <Level 
          mdata={mData}
          setMData={setMData} 
          cdata={cData}
          setCData={setCData} 
          images={images[levelIndex]} 
          trials={trials} 
          setTrials={setTrials} 
          nextLevel={setNext} 
          levelType={order[levelIndex]}
          startData={startData}
        ></Level>
      }
      else{
        return <Start setUser={setId} levelIndex={levelIndex} startData={startData} setStart={setStart} setTransition={setTransition}></Start>
      }
      
    }
    else{
      // allow data to be downloaded

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title: 'Post request'})
      };

      fetch('https://wix-server.herokuapp.com/', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.id));

      /*
      let allData = mData.concat(cData);
      return (
        <div className="survey-style">
          <h1>You are now done with the experiment. Please download your data and send to the proctor. Thank you for your time.</h1>
          <button>
            <CSVLink filename={user_id+".csv"} data={allData} >
              <h1>Download My Data</h1>
            </CSVLink>
          </button>
        </div>
        
      );
      */
    }
  }

  return (
    <div class="app">
      {getDisplay()}
    </div>

  );
}

export default App;
