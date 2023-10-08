import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
    // Use the useParams hook to access URL parameters
    const { company, nftid } = useParams();
  
    return (
      <div>

        <div className="flex items-center w-full bg-emerald-500">
            <h1 className="ml-2 text-2xl font-bold text-white py-5">Green Clothing Company</h1>
        </div>

        <h2>Product Details</h2>
        <p>Company: {company}</p>
        <p>NFT ID: {nftid}</p>
        {/* Your product details rendering */}
      </div>
    );
  }
  
  export default Product;