// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import Divider from '@mui/material/Divider';


// const columns = ['Product Name', 'Category', 'Amount', 'Action'];

// function SellerDashboard() {
//   const navigate = useNavigate();
//   const [sortConfig, setSortConfig] = useState(null);
//   let products = [
//     ['Nike Air Mag', 'Shoe', 100],
//     ['Air Jordan 1 - UNC', 'Shoe', 10000],
//     ['Louis Vuitton Backpack', 'Streetwear', 1000]
//   ];

//   const requestSort = key => {
//     let direction = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedProducts = [...products].sort((a, b) => {
//     if (!sortConfig) return 0;
//     const [key, direction] = [sortConfig.key, sortConfig.direction];
//     if (key === 'Product Name') {
//       return direction === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
//     } else if (key === 'Category') {
//       return direction === 'asc' ? a[1].localeCompare(b[1]) : b[1].localeCompare(a[1]);
//     } else if (key === 'Amount') {
//       return direction === 'asc' ? a[2] - b[2] : b[2] - a[2];
//     }
//     return 0;
//   });
  
//   const handleClick = () => {
//     navigate("/seller/mint");
//   }



//   return (

//       <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Navigation bar */}
//       <nav className="bg-blue-500 p-4">
//         <div className="container mx-auto text-white text-center font-bold text-2xl">
//           Your Dashboard
//         </div>
//       </nav>

//       <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
//         <Button variant="contained" color="primary" onClick={handleClick}>
//           +
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="flex-grow p-5 w-full">
//         <TableContainer component={Paper}>
//           <Table className="min-w-full">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column, index) => (
//                   <TableCell
//                     key={index}
//                     align="center"
//                     style={{ fontWeight: 'bold', fontSize: 20 }}
//                     onClick={() => requestSort(column)}
//                   >
//                     {column}

//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sortedProducts.map((product, index) => (
//                 <TableRow key={index}>
//                   {product.map((item, idx) => (
//                     <TableCell
//                       key={idx}
//                       align="center"
//                       style={{ fontWeight: 'semi-bold', fontSize: 18 }}
//                       className={`${idx === 3 ? 'hidden md:table-cell' : ''} ${idx !== 3 ? 'font-semibold' : ''}`}
//                     >
//                       {item}

//                     </TableCell>
//                   ))}
//                   <TableCell align="center" className="flex justify-center">
//                     <Button variant="contained" color="primary">
//                       Distribute
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// }

// export default SellerDashboard;

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
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { transferToClient } from '../../etherCalls/transferToClient';


const columns = ['Product Name', 'Category', 'Amount', 'Carbon Footprint'];

function SellerDashboard() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDistribute = (addresses) => {
    addresses = addresses.split(',');
    addresses.forEach(address => {transferToClient(address, 1)});
    // Add your logic to distribute selected products
    handleCloseModal();
  };

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const isRowSelected = productIndex => selectedRows.indexOf(productIndex) !== -1;

  const handleToggle = productIndex => {
    const selectedIndex = selectedRows.indexOf(productIndex);
    const newSelectedRows = [...selectedRows];

    if (selectedIndex === -1) {
      newSelectedRows.push(productIndex);
    } else {
      newSelectedRows.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelectedRows);
  };

  const sortedProducts = [
    ['Nike Air Mag', 'Shoe', 150, 1232],
    ['Air Jordan 1 - UNC', 'Shoe', 12000, 99921],
    ['Louis Vuitton Backpack', 'Streetwear', 1000, 6788]
  ].sort((a, b) => {
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

  const handleClick = () => {
    navigate("/seller/mint");
  }

  const handleActivate = () => {
    console.log('Activate button clicked');
  }

  const handleRevoke = () => {
    console.log('Revoke button clicked');
  }
  const handleBack = () => {
    navigate("/");
  }

  const carbonOffset = () => {
    navigate("seller/carbon-offset");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-blue-500 p-4 flex justify-center items-center">
        <div className="text-white text-center font-bold text-2xl items-center">
          Your Dashboard
        </div>
      </nav>

      <div className="flex-grow p-5 w-full">
        <TableContainer component={Paper}>
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < sortedProducts.length}
                    checked={selectedRows.length === sortedProducts.length}
                    onChange={() =>
                      selectedRows.length === sortedProducts.length
                        ? setSelectedRows([])
                        : setSelectedRows(sortedProducts.map((_, index) => index))
                    }
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ fontWeight: 'bold', fontSize: 20 }} // Adjusted padding
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
                  <TableCell align="center" padding="none">
                    <Checkbox
                      checked={isRowSelected(index)}
                      onChange={() => handleToggle(index)}
                      />
                  </TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        {/* Buttons aligned flexibly below the table */}
       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
       <Button
          variant="contained"
          color="primary"
          onClick={carbonOffset}
          style={{ marginRight: '16px' }} // Adjusted spacing
        >
          Offset Carbon Output
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Distribute
        </Button>
        <Button
          style={{ marginLeft: '16px', position: 'absolute', left: '16px', top: '16px', padding: '5px' }}
          variant="contained"
          color="secondary"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{padding: '20px', marginLeft: '16px'}}
           // Adjusted spacing
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleActivate}
          style={{ marginLeft: '16px' }} // Adjusted spacing
        >
          Activate
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRevoke}
          style={{ marginLeft: '16px' }} // Adjusted spacing
        >
          Revoke
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Enter Addresses</h2>
          <TextField
            id="addresses"
            label="Addresses"
            multiline
            rows={4}
            fullWidth
            value={addresses}
            onChange={e => setAddresses(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={() => handleDistribute(addresses)}>
            Distribute
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default SellerDashboard;