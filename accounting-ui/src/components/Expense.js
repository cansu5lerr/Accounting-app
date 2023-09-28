import React from 'react';
import { Box, Container, Stack, Typography, Grid, Avatar, Paper } from '@mui/material';
import ExpenseForm from './sections/ExpenseForm';
import ExpenseList from './sections/ExpenseList';
import { useEffect, useState, useCallback } from 'react';
import '../App.css';

const Expense = () => {
  return (
    
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container>

            <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'error.main' }}>
              Gider
       </Typography>
  
       </Paper>
       <br></br>
      <Grid container spacing={3}>
        {/* ExpenseForm */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <ExpenseForm />
          </Paper>
        </Grid>

        {/* ExpenseList */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <ExpenseList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default Expense;


