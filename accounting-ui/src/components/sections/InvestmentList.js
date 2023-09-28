import React from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import { useEffect, useState, useCallback } from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIncomeModal from './EditIncomeModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInvestmentModal from './EditInvestmentModal';
const InvestmentList = () => {
  const [investment,setInvestment] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const handleEditClick = (investment) => {
    setSelectedInvestment(investment);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedInvestment(null);
    setEditModalOpen(false);
  };
  const handleDeleteClick = async (investmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8085/api/auth/investment/${investmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        alert('Yatırım başarıyla silindi.');
        window.location.reload();
      } else {
        console.error('Yatırım silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Yatırım silme işlemi sırasında bir hata oluştu', error);
    }
  };
  useEffect(() => {
    const fetchUserInvestment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/investment', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInvestment(data);
          
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

    fetchUserInvestment();
  }, []);
  const rowColors = ['#D7BBF5', '#EDE4FF'];

  return (
   <Card sx={{height: '800px', overflowY: 'auto'}} >
<CardHeader title="Yatırımlar" sx = {{color :'warning.main'}}/>
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
          {investment.map((investment, index) => (
            <TableRow key={index} style= {{backgroundColor: rowColors[index % rowColors.length ]}}>        
              <TableCell>{investment.investmentName}</TableCell>
              <TableCell>{investment.amount}</TableCell>
              <TableCell>{investment.investmentDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(investment)} sx={{"&:hover": {color: 'primary.main',},}} ><BorderColorIcon /></IconButton>
              </TableCell>
              <TableCell>
              <IconButton onClick={() => handleDeleteClick(investment.id)} sx={{ "&:hover": { color: 'primary.main' } }}>
                  <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>    
      <EditInvestmentModal open={editModalOpen} onClose={handleCloseEditModal} investment={selectedInvestment} />
<Divider />
<CardActions sx={{ justifyContent: 'flex-end' }}>
  <Button
    color="inherit"
    endIcon={(
      <SvgIcon fontSize="small">
        <ArrowRightIcon />
      </SvgIcon>
    )}
    size="small"
    variant="text"
  >
    View all
  </Button>
</CardActions>
</Card>
  );
};

export default InvestmentList;

