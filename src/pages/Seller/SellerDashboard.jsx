import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = ['Product Name', 'Category', 'Amount', 'Action'];

function SellerDashboard() {
  const [sortConfig, setSortConfig] = useState(null);
  let products = [
    ['Nike Air Mag', 'Shoe', 100],
    ['Air Jordan 1 - UNC', 'Shoe', 10000],
    ['Louis Vuitton Backpack', 'Streetwear', 1000]
  ];

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    const [key, direction] = [sortConfig.key, sortConfig.direction];
    if (key === 'Product Name') {
      return direction === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
    } else if (key === 'Category') {
      return direction === 'asc' ? a[1].localeCompare(b[1]) : b[1].localeCompare(a[1]);
    } else if (key === 'Amount') {
      return direction === 'asc' ? a[2] - b[2] : b[2] - a[2];
    }
    return 0;
  });

  return (

      <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto text-white text-center font-bold text-2xl">
          Your Dashboard
        </div>
      </nav>

      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Button variant="contained" color="primary">
          +
        </Button>
      </div>

      {/* Table */}
      <div className="flex-grow p-5 w-full">
        <TableContainer component={Paper}>
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ fontWeight: 'bold', fontSize: 20 }}
                    onClick={() => requestSort(column)}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts.map((product, index) => (
                <TableRow key={index}>
                  {product.map((item, idx) => (
                    <TableCell
                      key={idx}
                      align="center"
                      style={{ fontWeight: 'semi-bold', fontSize: 18 }}
                      className={`${idx === 3 ? 'hidden md:table-cell' : ''} ${idx !== 3 ? 'font-semibold' : ''}`}
                    >
                      {item}
                    </TableCell>
                  ))}
                  <TableCell align="center" className="flex justify-center">
                    <Button variant="contained" color="primary">
                      Distribute
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default SellerDashboard;