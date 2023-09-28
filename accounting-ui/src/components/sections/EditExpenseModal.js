import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Big from 'big.js';

const nextSunday = dayjs().endOf('week').startOf('day');
const isWeekend = (date) => {
  
  const day = date.day();
  return day === 0 || day === 6;
};
const formatAmountForDisplay = (text) => {
  const milyonRegex = /(\d+) milyon/;
  const binRegex = /(\d+) bin/;
  const tlRegex = /(\d+) TL/;

  const milyonMatch = text.match(milyonRegex);
  const binMatch = text.match(binRegex);
  const tlMatch = text.match(tlRegex);

  let totalAmount = new Big(0);

  if (milyonMatch) {
    totalAmount = totalAmount.plus(new Big(milyonMatch[1]).times(1000000));
  }
  if (binMatch) {
    totalAmount = totalAmount.plus(new Big(binMatch[1]).times(1000));
  }
  if (tlMatch) {
    totalAmount = totalAmount.plus(new Big(tlMatch[1]));
  }

  return totalAmount.toString();
};

function EditExpenseModal({ open, onClose, expense }) {
  const [editedExpense, setEditedExpense] = useState(expense || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amountValue, setAmountValue] = useState(formatAmountForDisplay(editedExpense.amount || ''));
const [selectedDate, setSelectedDate] = useState(new Date()); // Örnek bir başlangıç tarihi
const formatSelectedDateForDisplay = (date) => {
  return dayjs(date).format('YYYY/MM/DD');
};
const handleDateChange = (date) => {
  setEditedExpense({ ...editedExpense, expenseDate: date });
};
  useEffect(() => {
    setEditedExpense(expense || {});
    setAmountValue(formatAmountForDisplay(expense?.amount || ''));    
  }, [expense]);
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setEditedIncome({ ...editedIncome, [name]: value });
    const { name, value } = e.target;
    if (name === 'amount') {
      setAmountValue(value);
            setEditedExpense({ ...editedExpense, [name]: value }); // editedIncome.amount'u güncelle
 // Kullanıcının girdiğini güncellemek için amountValue'i kullan
    }
    setEditedExpense({ ...editedExpense, [name]: value });
  };
  const newExpense = {
    expenseName: editedExpense.expenseName,   
    amount: amountValue,
    expenseDate: editedExpense.expenseDate,
  };

  const handleSave = async () => {

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8085/api/auth/expense/${editedExpense.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(newExpense),
      });
      console.log();
      if (response.ok) {
   
        const updatedIncome = await response.json();
       
        onClose(); // Düzenleme başarıyla tamamlandığında modalı kapatın
      } else {
        console.error('Gideri güncelleme başarısız oldu');
      }
    } catch (error) {
      console.error('Gideri güncelleme sırasında bir hata oluştu', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <br></br>
        <form>
          <div>
            <TextField
              fullWidth
              label="Gider Adı"
              name="expenseName"
              value={editedExpense.expenseName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <TextField
              fullWidth
              label="Miktar"
              name="amount"
              type="number"
              inputProps={{ min: "0" }}
              value={amountValue} 
              onChange={handleInputChange}
            />         
          </div>
          <div style={{ marginTop: '16px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(editedExpense.expenseDate)}              
                format="YYYY/MM/DD"
                views={['year', 'month', 'day']}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </div>
          <br></br>
          <Button variant="contained" onClick={handleSave} disabled={isSubmitting}>
            Kaydet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpenseModal;

