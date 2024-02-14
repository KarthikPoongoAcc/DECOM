//import React , { useState } from 'react';

import './App.css';
import Topheader from './components/Topheader';
// import Chat from './components/Chat';
import LeftNav from './components/LeftNav';
import ParticlesBg from 'particles-bg';
//import Summarization from './components/Summarization';

function App() {
 
  return (
    <div className="App">
      <Topheader />
      <div>
      <ParticlesBg type="cobweb"/>
        {/* <Summarization /> */}
       {/* <Chat/> */}
      </div>
     
    </div>
  );
}

export default App;
