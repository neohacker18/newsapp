import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar.js';
import News from './components/News';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
          />
          <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={6} category="general" country="in"/>}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={6} category="business" country="in"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={6} category="sports" country="in"/>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={6} category="health" country="in"/>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={6} category="science" country="in"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={6} category="entertainment" country="in"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="tech" pageSize={6} category="technology" country="in"/>}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="gen" pageSize={6} category="general" country="in"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;