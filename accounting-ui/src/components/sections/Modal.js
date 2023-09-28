import React, { useEffect, useState } from 'react';
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
  SvgIcon,
  Grid,
} from '@mui/material';
import EditExpenseModal from './EditExpenseModal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Modal = ({ selectedMonth }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // Gelir verilerini yükleme işlemi
  useEffect(() => {
    const fetchUserIncome = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8085/api/auth/income/month/${selectedMonth.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIncomeData(data);
        } else {
          console.error('Failed to fetch income data');
        }
      } catch (error) {
        console.error('An error occurred while fetching income data', error);
      }
    };

    fetchUserIncome();
  }, [selectedMonth]);

  // Gider verilerini yükleme işlemi
  useEffect(() => {
    const fetchUserExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8085/api/auth/expense/month/${selectedMonth.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpenseData(data);
        } else {
          console.error('Failed to fetch expense data');
        }
      } catch (error) {
        console.error('An error occurred while fetching expense data', error);
      }
    };

    fetchUserExpense();
  }, [selectedMonth]);

  const rowColors = ['#97DEFF', '#C9EEFF'];
const rowColors1= ['#FF6666','#FCAEAE'];
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card sx={{ height: '800px', overflowY: 'auto' }}>
          <CardHeader title="Gelirler" sx={{ color: 'primary.main' }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gelir Adı</TableCell>
                <TableCell>Miktar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeData.map((income, index) => (
                <TableRow key={index} style={{ backgroundColor: rowColors[index % rowColors.length] }}>
                  <TableCell>{income.incomeName}</TableCell>
                  <TableCell>{income.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
 
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ height: '800px', overflowY: 'auto' }}>
          <CardHeader title="Giderler" sx={{ color: 'error.main' }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gider Adı</TableCell>
                <TableCell>Miktar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseData.map((expense, index) => (
                <TableRow key={index} style={{ backgroundColor: rowColors1[index % rowColors1.length] }}>
                  <TableCell>{expense.expenseName}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Modal;
