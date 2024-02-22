//import React , { useState } from 'react';

import './App.scss';
import Topheader from './components/Topheader';
// import Chat from './components/Chat';
import LeftNav from './components/LeftNav';
import ParticlesBg from 'particles-bg';
import Welcome from './components/Welcome';

import { Routes, Route } from "react-router-dom";
import Summarization from './components/Summarization';
import Enhance from './components/Enhance';
import Recommend from './components/Recommend';
import DocGeneration from './components/DocGeneration';

// import FileUpload from './components/FileUpload';

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
        
      <Routes>
        <Route path="/" element={<Welcome />} />
         
          <Route path="summarization" element={<Summarization />} />
          <Route path="enhance" element={<Enhance />} />
          <Route path="recomment" element={<Recommend />} />
          <Route path="docgeneration" element={<DocGeneration />} />
       
      </Routes>
      <ParticlesBg type="cobweb"/>
      </div>
        {/* <Summarization /> */}
       {/* <Chat/> */}
      </main>
     
    </div>
  );
}

export default App;
