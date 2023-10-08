import React from 'react';

import J1 from '../assets/J1.jpeg';


function ProductSample() {
    // Use the useParams hook to access URL parameters
  
    return (
      <div className="flex flex-col justify-center items-center w-full">

        <div className="flex items-center w-full bg-emerald-500">
            <h1 className="ml-2 text-2xl font-bold text-white py-5">Green Clothing Company</h1>
        </div>

        
            <img src={J1} alt="Jordan 1" className='w-1/2 mt-6' />

            



        <div className="flex flex-col justify-center items-center space-x-4 py-4 px-8 w-full">
                <h1 className="text-2xl font-bold text-center text-black">Jordan Retro 1s, Limited Edition</h1>

            </div>

                


            
      </div>
    );
  }
  
  export default ProductSample;