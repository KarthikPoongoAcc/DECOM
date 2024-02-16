//import React , { useState } from 'react';

import './App.scss';
import Topheader from './components/Topheader';
// import Chat from './components/Chat';
import LeftNav from './components/LeftNav';
import ParticlesBg from 'particles-bg';
import Welcome from './components/Welcome';

//import Summarization from './components/Summarization';

function App() {
 
  return (
    <div className="App">
      <Topheader />
      <main className='d-flex'>
        <div className='left-nav'>
          <LeftNav/>
        </div>
        <div className='main-content'>
          <Welcome />
      <ParticlesBg type="cobweb"/>
      </div>
        {/* <Summarization /> */}
       {/* <Chat/> */}
      </main>
     
    </div>
  );
}

export default App;
