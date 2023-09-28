import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
export const OverviewTotalProfit = (props) => {
  const {sx } = props;
  const [investment, setInvestment] = useState({
    totalInvestment: ''      
  });
  useEffect(() => {
    const fetchUserInvestment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/investment/total', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInvestment({
         
            totalInvestment:data.totalInvestment
       
          });
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

    fetchUserInvestment();
  }, []);
  return (
    <Card sx= {sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Yatırım
            </Typography>
            <Typography variant="h4">
              {investment.totalInvestment}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
