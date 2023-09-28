import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';

export const OverviewTasksProgress = (props) => {
  const {sx} = props;
  const [expense, setExpense] = useState({
    totalExpense:''
  });
  //gider
  useEffect(() => {
    const fetchUserExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/expense/total', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpense({
         
            totalExpense:data.totalExpense
       
          });
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

    fetchUserExpense();
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
              gutterBottom
              variant="overline"
            >
              Gider
            </Typography>
            <Typography variant="h4">
              {expense.totalExpense}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          {/* <LinearProgress
            value={value}
            variant="determinate"
          /> */}
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
