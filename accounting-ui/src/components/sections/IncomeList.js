import React from 'react';
import { useState, useEffect } from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';

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

const IncomeList = () => {
  const [income, setIncome] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedIncome(null);
    setEditModalOpen(false);
  };

  const handleDeleteClick = async (incomeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8085/api/auth/income/${incomeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        alert('Gelir başarıyla silindi.');
        window.location.reload();
      } else {
        console.error('Gelir silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Gelir silme işlemi sırasında bir hata oluştu', error);
    }
  };

  useEffect(() => {
    const fetchUserIncome = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/income', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIncome(data);
      
        } else {
          console.error('Failed to fetch user income data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user income data', error);
      }
    };

    fetchUserIncome();
  }, []);
  const rowColors = ['#D7BBF5', '#EDE4FF'];
  return (
    <Card sx={{ height: '800px', overflowY: 'auto' }}>
      <CardHeader title="Gelirler" sx={{ color: 'primary.main' }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Gelir Adı</TableCell>
            <TableCell>Miktar</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>Düzenle</TableCell>
            <TableCell>Sil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {income.map((income, index) => (
            <TableRow key={index} style= {{backgroundColor: rowColors[index % rowColors.length ]}}>
           
              <TableCell>{income.incomeName}</TableCell>
              <TableCell>{income.amount}</TableCell>
              <TableCell>{income.incomeDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(income)} sx={{"&:hover": {color: 'primary.main',},}}><BorderColorIcon /></IconButton>
              </TableCell>
              <TableCell>
              <IconButton onClick={() => handleDeleteClick(income.id)} sx={{ "&:hover": { color: 'primary.main' } }}>
                  <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditIncomeModal open={editModalOpen} onClose={handleCloseEditModal} income={selectedIncome} />
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
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
        </Button>
      </CardActions>
    </Card>
  );
};

export default IncomeList;
