import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

//PAGE IMPORTS
import Homepage from './pages/Homepage';
import Mint from './pages/Seller/Mint';
import SellerDashboard from './pages/Seller/SellerDashboard';



function App() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="seller/mint" element={<Mint />} />
            <Route path="seller/dashboard" element={<SellerDashboard />} />

            
          </Routes>
      </Router>
        
    </div>
      
  )
}

export default App
