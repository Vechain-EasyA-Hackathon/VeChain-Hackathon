import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

//PAGE IMPORTS
import Homepage from './pages/Homepage';
import Mint from './pages/Seller/Mint';
import SellerDashboard from './pages/Seller/SellerDashboard';
import Product from './pages/Product';



function App() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="seller/mint" element={<Mint />} />
            <Route path="seller/dashboard" element={<SellerDashboard />} />

            {/* Product, dependent on seller/company, then id given for nft should take in parameter of company and nftid */}

            <Route path="product/:company/:nftid" element={<Product />} />

          </Routes>
      </Router>
        
    </div>
      
  )
}

export default App
