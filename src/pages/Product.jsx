import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
    // Use the useParams hook to access URL parameters
    const { company, nftid } = useParams();
  
    return (
      <div>
        <h2>Product Details</h2>
        <p>Company: {company}</p>
        <p>NFT ID: {nftid}</p>
        {/* Your product details rendering */}
      </div>
    );
  }
  
  export default Product;