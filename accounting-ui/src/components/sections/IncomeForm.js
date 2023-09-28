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
// import DatePicker from 'react-datepicker';
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
const IncomeForm = () => {
  const [incomeName, setIncomeName] = useState('');
  const [amount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState(new Date());

  const handleAddIncome = async () => {
    // Miktarın sadece sayı içerdiğinden emin olun
    if (!/^\d+$/.test(amount)) {
      alert('Miktar sadece sayı içerebilir.');
      return;
    }

    if (incomeName && amount && incomeDate) {
      const newIncome = {
        incomeName: incomeName,   
        amount: parseFloat(amount),
        incomeDate: incomeDate,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/income', {
          method: 'POST',
          headers: {
        
            'Authorization': `${token}`,
            'Content-Type': 'application/json' 
          
          },
          body: JSON.stringify(newIncome),
        });

        if (response.status === 200) {
          alert('Gelir başarıyla kaydedildi.');
          // onAddIncome(newIncome);
          setIncomeName('');
          setIncomeAmount('');
          setIncomeDate(dayjs());
          window.location.reload();
        } else {
          alert('Gelir kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error(error);
        alert('Gelir kaydedilirken bir hata oluştu.');
      }
    }
  };


 

  return (
   
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
  
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gelir Adı"
              variant="outlined"
              value={incomeName}
              onChange={(e) => setIncomeName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Miktar"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <DatePicker
              selected={incomeDate}
              onChange={(date) => setIncomeDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </Grid> */}
               <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // value={expenseDate}
                // onChange={(date) => setExpenseDate(date)}
                // renderInput={(params) => <TextField {...params} variant="outlined" />}
                // maxDate={nextSunday}
                // views={['year', 'month', 'day']}
                //defaultValue={nextSunday}
                value= {nextSunday}
               // shouldDisableDate={isWeekend}
                views={['year', 'month', 'day']}
                onChange={(date)=>setIncomeDate(date)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'primary.main', color: '#fff' }}
              onClick={handleAddIncome}
            >
              Ekle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};

export default IncomeForm;


