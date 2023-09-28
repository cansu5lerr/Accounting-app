import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
]; //burası veritabanından çekilecek

const AccountProfileDetails = () => {

const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      try {
      
        const token = localStorage.getItem('token'); // Replace 'token' with the actual key you used to store the token
        const response = await fetch('http://localhost:8085/api/auth/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`
          }
        });

        if (response.ok) {
          
          const data = await response.json();
          console.log(data);
          setValues({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
          });
        } else {
          // Handle error cases
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user profile data', error);
      }
    };

      

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, []);
 
    const handleSaveDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8085/api/auth/user/profile', {
            method: 'POST',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json'
            
            },
            body: JSON.stringify(values), // values nesnesini JSON olarak gönderin
          });
      
          if (response.ok) {
            // Profil başarıyla güncellendi, istediğiniz işlemi yapabilirsiniz
            console.log('Profil başarıyla güncellendi.');
          } else {
            // Hata durumunu işleyin
            console.error('Profil güncelleme işlemi başarısız oldu.');
          }
        } catch (error) {
          console.error('Profil güncelleme işlemi sırasında bir hata oluştu:', error);
        }
      }



  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Güncelleme"
          title="Profil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
               <TextField
                  fullWidth                  
                  label="Kullanıcı Adı"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label="Adı"
                  name="name"
                  onChange={handleChange}
                  
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Soyadı"
                  name="surname"
                  onChange={handleChange}                  
                  value={values.surname}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}                 
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick = {handleSaveDetails}>
           Kaydet
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
export default AccountProfileDetails;
