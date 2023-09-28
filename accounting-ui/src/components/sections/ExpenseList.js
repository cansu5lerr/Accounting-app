// import React from 'react';
// import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
// import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
// import { useEffect, useState, useCallback } from 'react';
// import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardHeader,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   SvgIcon,
//   Typography,
//   Avatar
// } from '@mui/material';
// const ExpenseList = () => {
//   const [expense,setExpense] = useState([]);
//   useEffect(() => {
//     const fetchUserExpense = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:8085/api/auth/expense', {
//           method: 'GET',
//           headers: {
//             'Authorization': `${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setExpense(data);
          
//         } else {
//           console.error('Failed to fetch user profile data');
//         }
//       } catch (error) {
//         console.error('An error occurred while fetching user profile data', error);
//       }
//     };

//     fetchUserExpense();
//   }, []);
//   return (
//    <Card sx={{height: '40%', overflowY: 'auto'}} >
// <CardHeader title="Giderler" sx = {{color :'error.main'}}/>
// <List>
//   {expense.map((expense, index) => {
//     const hasDivider = index < expense.length - 1;
//   //  const ago = formatDistanceToNow(product.updatedAt);
    
//     return (
//       <ListItem
//         divider={hasDivider}
//         key={index}
//       >
//                <Avatar
//       sx={{
//         backgroundColor: 'error.main',
//         height: 40,
//         width: 40
//       }}
//     >
//       <SvgIcon>
//         <CurrencyDollarIcon />
//       </SvgIcon>
//     </Avatar>
//         <ListItemAvatar>
//           {

//                 <Box
//                   sx={{
//                     borderRadius: 1,
//                     backgroundColor: 'neutral.200',
//                     height: 100,
//                     width: 48
//                   }}
//                 />
             
//           }
//         </ListItemAvatar>                
//         <ListItemText
        
//           primary={expense.expenseName} secondary={
//             <React.Fragment>
//               <Typography variant="h6" color="textPrimary">
//             Miktar: {expense.amount}
//               </Typography>
//               <Typography variant="h6" color="textPrimary">
//             Tarihi: {expense.expenseDate}
//               </Typography>
//             </React.Fragment>
//           }
//           primaryTypographyProps={{ variant: 'subtitle1' }}
//           secondaryTypographyProps={{ variant: 'body2' }}
     
        
//         />
//         <IconButton edge="end">
//           <SvgIcon>
//             <EllipsisVerticalIcon />
//           </SvgIcon>
//         </IconButton>
//       </ListItem>
//     );
//   })}
// </List>
// <Divider />
// <CardActions sx={{ justifyContent: 'flex-end' }}>
//   <Button
//     color="inherit"
//     endIcon={(
//       <SvgIcon fontSize="small">
//         <ArrowRightIcon />
//       </SvgIcon>
//     )}
//     size="small"
//     variant="text"
//   >
//     View all
//   </Button>
// </CardActions>
// </Card>
//   );
// };

// export default ExpenseList;
import React, { useEffect, useState } from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  SvgIcon
} from '@mui/material';
import EditExpenseModal from './EditExpenseModal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpenseList = () => {
  const [expense, setExpense] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedExpense(null);
    setEditModalOpen(false);
  };
  const handleDeleteClick = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8085/api/auth/expense/${expenseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        alert('Gider başarıyla silindi.');
        window.location.reload();
      } else {
        console.error('Gider silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Gider silme işlemi sırasında bir hata oluştu', error);
    }
  };

  useEffect(() => {
    const fetchUserExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/expense', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setExpense(data);
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

    fetchUserExpense();
  }, []);
const rowColors = ['#D7BBF5', '#EDE4FF'];
  return (
    <Card sx={{ height: '600px', overflowY: 'auto' }}>
      <CardHeader title="Giderler" sx={{ color: 'error.main' }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Düzenle</TableCell>
              <TableCell>Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expense.map((expense, index) => (
              <TableRow key={index} style= {{backgroundColor: rowColors[index % rowColors.length ]}}>
          
                <TableCell>{expense.expenseName}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.expenseDate}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleEditClick(expense)} sx={{"&:hover": {color: 'primary.main',},}} ><BorderColorIcon /></IconButton>
              </TableCell>
              <TableCell>
              <IconButton onClick={() => handleDeleteClick(expense.id)} sx={{ "&:hover": { color: 'primary.main' } }}>
              <DeleteIcon />
              </IconButton>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditExpenseModal open={editModalOpen} onClose={handleCloseEditModal} expense={selectedExpense} />

      </TableContainer>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default ExpenseList;

