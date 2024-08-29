import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.js'
import NavBar from './NavBar.js'
import AddMatch from './AddMatch.js'
import PlayerContainer from './PlayerContainer.js'
import PerformanceContainer from './PerformanceContainer.js'
import PlayerAvgContainer from './PlayerAvgContainer.js'

const RouteConfig = () => {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addmatch" element={<AddMatch />} />
            <Route path="/match" element={<PlayerContainer />} />
            <Route path="/stats" element={<PerformanceContainer />} />
            <Route path="/aboveavergae" element={<PlayerAvgContainer />} />
        </Routes>
    </BrowserRouter>
  )
}

export default RouteConfig
