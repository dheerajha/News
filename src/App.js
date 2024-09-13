
// import '../src/';

import React, { useState } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = (props) => {
  const pageSize = 8;

  const apiKey = 'fd92412b190a4b2889d83e3578e79103'
  // const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);


  return (
    <div >
      <Router>
        <Navbar />
        <LoadingBar
          height={2}
          color='#f11946'
          progress={progress}
        />
        <Routes >
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="genral" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App;

//  the rcc is react custom based component which only create the class but rce creates the react class export component  which help you to export the class  