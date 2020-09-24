import React, { useEffect, useState } from 'react';
import './App.css';
import Level from './Level';

function App() {

  const LOA1Imgs = require.context('./LOA_1/', true, /\.png$/);
  const LOA1 = LOA1Imgs.keys().map(path=>({path, file: LOA1Imgs(path)}));

  const LOA3Imgs = require.context('./LOA_3/', true, /\.png$/);
  const LOA3 = LOA3Imgs.keys().map(path=>({path, file: LOA3Imgs(path)}));

  const LOA91Imgs = require.context('./LOA_9/LOA_9_1/', true, /\.png$/);
  const LOA91 = LOA91Imgs.keys().map(path=>({path, file: LOA91Imgs(path)}));

  const LOA92Imgs = require.context('./LOA_9/LOA_9_2/', true, /\.png$/);
  const LOA92 = LOA92Imgs.keys().map(path=>({path, file: LOA92Imgs(path)}));

  const [nextLevel, setNext] = useState(false);
  const [levelIndex, setLevel] = useState(0);
  const [trials, setTrials] = useState(0);
  const [blinkImage, setBlink] = useState(false);
  const [highlightBtn, setHighlight] = useState(false);
  const order = [1, 3, 91, 92];
  const images = [LOA1, LOA3, LOA91, LOA92];
  const blinks = [false, true, false, true];
  const highlights = [false, false, true, true];

  function getLevelSettings() {
    console.log("getting settings for "+order[levelIndex]);
    switch(order[levelIndex]){
      case 1:
        setBlink(false);
        setHighlight(false);
        break;
      case 3:
        setBlink(true);
        setHighlight(false);
        break;
      case 91:
        setBlink(false);
        setHighlight(true);
        break;
      case 92:
        setBlink(true);
        setHighlight(true);
        break;
      default:
        break;
    }
    return;
  }
 
  useEffect(()=>{
    if(nextLevel === true){
      if(levelIndex == 3){
        console.log("done with everything");
      }
      else{
        setLevel(levelIndex + 1);
        setTrials(0);
        setNext(false);
      }
    }
  }, [nextLevel]);

  useEffect(()=>{
    getLevelSettings();
    console.log(blinkImage, highlightBtn);
  }, [levelIndex]);

  return (
    <div>
      <Level highlightBtn={highlightBtn} blinkImage={blinkImage} images={images[levelIndex]} trials={trials} setTrials={setTrials} nextLevel={setNext} levelType={order[levelIndex]}></Level>
    </div>
  );
}

export default App;
