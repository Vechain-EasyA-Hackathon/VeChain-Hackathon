import React from 'react';
import { useParams } from 'react-router-dom';

import { useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';



import J1 from '../assets/J1.jpeg';


function ProductSample() {
    // Use the useParams hook to access URL parameters

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const navigateToProduct = (path) => {
      navigator(path);
    };
    

    const products = [
      {
        productID: "001",
        name: "Product Name",
        carbonFootprint: "20g",
        quantity: "10",
        data: "Sample Data",
        sellerName: "John Doe",
        manufacturerFootprint: "25g",
        sourceMaterials: "Material A",
        sourceLocation: "Location A",
        manufacturerDescription: "Manufacturer A"
      },
    ];

    


    const tableHeaders = [
      'Product ID',
      'Name',
      'Carbon Footprint',
      'Quantity',
      'Data',
      'Seller Name',
      'Manufacturer Footprint',
      'Source Materials',
      'Source Location',
      'Manufacturer Description'
    ];


  
    return (
      <div className="flex flex-col justify-center items-center w-full">

        <div className="flex items-center w-full bg-emerald-500">
            <h1 className="ml-2 text-2xl font-bold text-white py-5">SustainaLink</h1>
        </div>

        
          <img src={J1} alt="Jordan 1" className='w-1/2 mt-8' />

            



          <div className="flex flex-col justify-center items-center space-x-4 pt-6 px-8 w-full text-3xl">
            <h1 className="text-2xl font-bold text-center text-black">Air Jordan Retro 1s, Limited Edition</h1>
          </div>

          <div className="flex flex-col justify-center items-center py-6 space-x-4 px-8 w-3/4">
              <div className='w-full'>
                <h1 className="text-2xl font-bold text-black">
                  Iconic and timeless, the Air Jordan Retro 1s are the sneakers that started it all. Crafted with premium materials and boasting a classic high-top silhouette, these kicks offer a blend of comfort and style. Featuring the signature Nike Swoosh and the distinctive Air Jordan logo, they're a testament to basketball history and streetwear fashion alike. A must-have for sneakerheads and Jordan enthusiasts. 
                </h1>
              </div>
                  
                <div className='py-4'>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                      <TableBody>
                        {tableHeaders.map((header, idx) => (
                          <TableRow key={header}>
                            <TableCell>{header}</TableCell>
                            {products.map((product) => (
                              <TableCell key={product.productID}>
                                {Object.values(product)[idx]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                




          </div>
                


            
      </div>
    );
  }
  
  export default ProductSample;