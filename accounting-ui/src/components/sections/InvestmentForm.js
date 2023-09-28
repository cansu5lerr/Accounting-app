
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  styled
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [investmentName, setInvestmentName] = useState('');
  const [amount, setInvestmentAmount] = useState('');
  const [investmentDate, setInvestmentDate] = useState(new Date());

  const handleAddInvestment = async () => {
    // Miktarın sadece sayı içerdiğinden emin olun
    if (!/^\d+$/.test(amount)) {
      alert('Miktar sadece sayı içerebilir.');
      return;
    }

    if (investmentName && amount && investmentDate) {
      const newInvestment = {
        investmentName: investmentName,
        amount: parseFloat(amount),
        investmentDate: investmentDate,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/investment', {
          method: 'POST',
          headers: {
        
            'Authorization': `${token}`,
            'Content-Type': 'application/json' 
          
          },
          body: JSON.stringify(newInvestment),
        });

        if (response.status === 200) {
          alert('Yatırım başarıyla kaydedildi.');
          setInvestmentName('');
          setInvestmentAmount('');
          setInvestmentDate(dayjs());
        } else {
          alert('Yatırım kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error(error);
        alert('Yatırım kaydedilirken bir hata oluştu.');
      }
    }
  };

  return (
   
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: 'warning.main' }}>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Yatırım Adı"
              variant="outlined"
              value={investmentName}
              onChange={(e) => setInvestmentName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Miktar"
              type= "number" 
              variant="outlined"
              value={amount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value= {nextSunday}            
                views={['year', 'month', 'day']}
                onChange={(date)=>setInvestmentDate(date)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'warning.main' }}
              onClick={handleAddInvestment}
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


