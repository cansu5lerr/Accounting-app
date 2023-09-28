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
import Modal from './Modal';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
function IncomeModal({ open, onClose }) {
  //const [editedExpense, setEditedExpense] = useState(income || {});
  const [incomeMonth ,setIncomeMonth] = useState([]);
  //const parts = income.yearMonthKey.split("-");
  //const month = parts[1];
  const months = [
    { id: '01', name: 'Ocak' },
    { id: '02', name: 'Şubat' },
    { id: '03', name: 'Mart' },
    { id: '04', name: 'Nisan' },
    { id: '05', name: 'Mayıs' },
    { id: '06', name: 'Haziran' },
    { id: '07', name: 'Temmuz' },
    { id: '08', name: 'Ağustos' },
    { id: '09', name: 'Eylül' },
    { id: '10', name: 'Ekim' },
    { id: '11', name: 'Kasım' },
    { id: '12', name: 'Aralık' },
  ];

  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleTabClick = (month) => {
    setSelectedMonth(month);
    
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
      <div>  
          {months.map((month) => (
            <Tab
              key={month.id}
              label={month.name}
              //value={month.id}
             onClick={() => handleTabClick(month)}             
            />
          ))}
      
   
   {selectedMonth && ( // Eğer bir ay seçilmişse Modal'ı görüntüle
            <Modal
              selectedMonth={selectedMonth}
              onClose={() => setSelectedMonth(null)} // Modal kapatıldığında ayı sıfırla
            />
          )}
      
</div>

     
      </DialogContent>
    </Dialog>
  );

}
export default IncomeModal;

