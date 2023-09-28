import React from 'react';
import { Box, Container, Stack, Typography, Grid, Avatar, Paper } from '@mui/material';

import InvestmentForm from './sections/InvestmentForm';
import InvestmentList from './sections/InvestmentList';
import { useEffect, useState, useCallback } from 'react';

const Investment = () => {


  return (
  
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'warning.main' }}>
             Yatırım
        </Typography>
  
        </Paper>
        <Grid container spacing={13}>
          <Grid xs={10} lg={6}  >
      
            <InvestmentForm />
          </Grid>
      
          <Grid xs={10} lg={5} >
            {/* Income List */}
            <InvestmentList />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  </Box>
  

  );
};

export default Investment;
