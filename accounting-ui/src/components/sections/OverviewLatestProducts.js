import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
  Avatar
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import React from 'react';
export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const [expense, setExpense] = useState([]);
  //gider
  useEffect(() => {
    const fetchUserExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/auth/expense/date', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpense(data);
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
      <CardHeader title="Yaklaşan Giderler" />
      <List>
        {expense.map((expense, index) => {
          const hasDivider = index < expense.length - 1;
        //  const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={index}
            >
                     <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 40,
              width: 40
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
              <ListItemAvatar>
                {
    
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 100,
                          width: 48
                        }}
                      />
                   
                }
              </ListItemAvatar>                
              <ListItemText
              
                primary={expense.expenseName} secondary={
                  <React.Fragment>
                    <Typography variant="body2" color="textPrimary">
                  Miktar: {expense.amount}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                  Tarihi: {expense.expenseDate}
                    </Typography>
                  </React.Fragment>
                }
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
           
              
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
