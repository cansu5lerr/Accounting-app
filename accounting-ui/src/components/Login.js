
    
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import Register from './Register';
const Login = ({onLogin}) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('name');

  const handleMethodChange = (event, newMethod) => {
    setMethod(newMethod);
  };

  const handleSkip = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert('Kimlik doğrulama atlandı. Kullanıcı giriş yaptı gibi kabul ediliyor.');
      setLoading(false);
    } catch (error) {
      console.error('Kimlik doğrulama hatası:', error.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Kullanıcı adı gereklidir'),
      password: Yup
        .string()
        .max(255)
        .required('Şifre gereklidir')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://localhost:8085/api/auth/signin', {
          username: values.name,
          password: values.password
        });

        const token = response.data.accessToken;

        localStorage.setItem('token', token);
        onLogin(token);
        setSubmitting(false);
      } catch (error) {
        console.error('Kimlik doğrulama hatası:', error.message);
        setSubmitting(false);
      }
    }
  });

  return (
    <Grid
  container
  sx={{
    minHeight: '100vh',
    background: 'radial-gradient(50% 50% at 50% 50%, #2E4A62 0%, #090E23 100%)',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Altındaki gridlerin düşük konumda olmasını engeller
  }}
>
  <Typography
    align="center"
    color="#15B79E"
    sx={{
      fontSize: '24px',
      lineHeight: '32px',
      mb: 1
    }}
    variant="h3"
  >
    Bireysel Muhasebe{' '}
  </Typography>
  <br></br>
  <Typography
    align="center"
    sx={{
      fontSize: '24px',
      lineHeight: '32px',
      mb: 1,
      color: "white"
    }}
    variant="subtitle1"
  >
    Finansal Hesaplarınızı Kolaylaştırın!
  </Typography>

  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        alt=""
        src="/assets/devias-kit-pro.png"
        style={{ width: '500px' }}
      />
    </Grid>
    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '10px' }}>
                  <Typography
               color="text.secondary"
              variant="body2"
              align="center">
             Hesabınız yok mu?
               <Link to="/register" className="nav-link">
                        <i class="fas fa-fw fa-user-md"></i>
                        <span>Kayıt ol</span>
                        </Link>             
          </Typography>
        <Typography variant="h4" align="center" gutterBottom>
    
        </Typography>
        <Tabs
          onChange={handleMethodChange}
          sx={{ mb: 3 }}
          value={method}
        >
          <Tab
            label="Kullanıcı adı ile giriş"
            value="name"
          />
          <Tab
            label="Telefon numarası ile giriş"
            value="phoneNumber"
          />
        </Tabs>
        {method === 'name' && (
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Kullanıcı adı"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Şifre"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Stack>
  
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
             Giriş Yap
            </Button>
            {/* <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              onClick={handleSkip}
            >
              Kimlik doğrulamayı atla
            </Button> */}
          </form>
        )}
        {method === 'phoneNumber' && (
          <div>
            <Typography
              sx={{ mb: 1 }}
              variant="h6"
            >
              Bu özellik sonrasında eklenecektir
            </Typography>
            <Typography color="text.secondary">
              Bu özellik yakında kullanılabilecek.
            </Typography>
          </div>
        )}
      </Paper>
    </Grid>

  
  </Grid>
</Grid>

   
  
  );
}

export default Login;
