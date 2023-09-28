import React from 'react';
import { Box, Container, Stack, Typography, Grid, Avatar, Paper } from '@mui/material';
import IncomeForm from './sections/IncomeForm';
import IncomeList from './sections/IncomeList';
import { useEffect, useState, useCallback } from 'react';
import '../App.css';

const Income = () => {


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
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'primary.main' }}>
             Gelir
        </Typography>
  
        </Paper>

        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}  >
            {/* Income Form */}
            <Paper elevation = {3}>
            <IncomeForm />
            </Paper>
          </Grid>
      
          <Grid item xs={12} md={6} >
           <Paper elevation={3}>
           <IncomeList />
           </Paper>
        
          </Grid>
        </Grid>
     
    </Container>
  </Box>


  );
};

export default Income;
