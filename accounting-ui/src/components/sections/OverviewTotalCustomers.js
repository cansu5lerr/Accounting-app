import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';

export const OverviewTotalCustomers = (props) => {
  const { difference, positive = false, sx, value } = props;
  const [budget,setBudget] = useState({
    totalBudget: ''
  });
  useEffect(() => {
    const fetchUserBudget = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/budget', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBudget({
         
            totalBudget:data.amount
       
          });
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

    fetchUserBudget();
  }, []);
  return (
    <Card sx={sx}>
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
              Bütçe
            </Typography>
            <Typography variant="h4">
              {budget.totalBudget}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
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

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

