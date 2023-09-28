
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Card, CardContent, Typography, Grid, TextField, Button, styled } from '@mui/material';
import React, {useEffect, useState} from 'react';
const lastMonday = dayjs().startOf('week');
const nextSunday = dayjs().endOf('week').startOf('day');
const maxYear = dayjs().year() + 5; // 5 yıl ileriye git

const isWeekend = (date) => {
  const day = date.day();
  return day === 0 || day === 6;
};

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date());

  const handleAddExpense = async () => {
    // Miktarın sadece sayı içerdiğinden emin olun
    if (!/^\d+$/.test(amount)) {
      alert('Miktar sadece sayı içerebilir.');
      return;
    }

    if (expenseName && amount && expenseDate) {
      const newExpense = {
        expenseName: expenseName,
        amount: parseFloat(amount),
        expenseDate: expenseDate,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/expense', {
          method: 'POST',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpense),
        });

        if (response.status === 200) {
          alert('Gider başarıyla kaydedildi.');
          setExpenseName('');
          setExpenseAmount('');
          setExpenseDate(dayjs());
        } else {
          alert('Gider kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error(error);
        alert('Gider kaydedilirken bir hata oluştu.');
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{backgroundColor: 'primary.main', color: '#fff' }}>
          {/* Gider Ekle */}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gider Adı"
              variant="outlined"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Miktar"
              variant="outlined"
              value={amount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={nextSunday}
                views={['year', 'month', 'day']}
                onChange={(date) => setExpenseDate(date)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'primary.main', color: '#fff' }}
              onClick={handleAddExpense}
          
            >
              Ekle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;

