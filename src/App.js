import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShowImage from './ShowImage';
import Counting from './Counting';
import Monitoring from './Monitoring';

function App() {
  return (
    <div className="task_style">
    <ShowImage></ShowImage>
    <Monitoring></Monitoring>
    <Counting></Counting>
    </div>
  );
}

export default App;
