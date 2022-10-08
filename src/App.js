import React from 'react'
import './App.css'
import About from './About'
import How from './How'
import Home from './Home'
import Predict from './Predict'
import Apology from './Apology'
import { Routes, Route } from 'react-router-dom'


const App = () => {

  
  return (
    <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how" element={<How />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/apology" element={<Apology />} />
        </Routes>
      
    </div>
  )
}

export default App