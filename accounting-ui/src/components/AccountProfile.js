import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import { useEffect, useState, useCallback } from 'react';
  const AccountProfile = () => {
    const [user, setUser] = useState({
      avatar: '', 
      username: '',   
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8085/api/auth/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json'

            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setUser({
           
              username: data.username,
              avatar: '/assets/avatars/avatar-anika-visser.png'
         
            });
          } else {
            console.error('Failed to fetch user profile data');
          }
        } catch (error) {
          console.error('An error occurred while fetching user profile data', error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
            >
              {user.username}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {/* {user.city} {user.country} */}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {/* {user.timezone} */}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions>
          <Button
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions> */}
      </Card>
    );
  };
  
  export default AccountProfile;
  