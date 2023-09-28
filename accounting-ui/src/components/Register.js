// // import React from 'react';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { Box, Button, Stack, TextField, Typography } from '@mui/material';
// // import { Link } from 'react-router-dom';

// // const Register = () => {
// //     const formik = useFormik({
// //         initialValues: {
// //           email: '',
// //           name: '',
// //           password: '',
// //           submit: null
// //         },
// //         validationSchema: Yup.object({
// //           email: Yup
// //             .string()
// //             .email('Must be a valid email')
// //             .max(255)
// //             .required('Email is required'),
// //           name: Yup
// //             .string()
// //             .max(255)
// //             .required('Name is required'),
// //           password: Yup
// //             .string()
// //             .max(255)
// //             .required('Password is required')
// //         })
// //       });
    
// //     return(
// //   <>
// //    <Box
// //         sx={{
// //           flex: '1 1 auto',
// //           alignItems: 'center',
// //           display: 'flex',
// //           justifyContent: 'center'
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             maxWidth: 550,
// //             px: 3,
// //             py: '100px',
// //             width: '100%'
// //           }}
// //         >
// //           <div>
// //             <Stack
// //               spacing={1}
// //               sx={{ mb: 3 }}
// //             >
// //               <Typography variant="h4">
// //                 Register
// //               </Typography>
// //               <Typography
// //                 color="text.secondary"
// //                 variant="body2"
// //               >
// //                 Already have an account?
// //                 &nbsp;
// //                 <Link to="/login" className="nav-link">
// //                         <i class="fas fa-fw fa-user-md"></i>
// //                         <span>Login</span>
// //                 </Link>
// //               </Typography>
// //             </Stack>
// //             <form
// //               noValidate
// //               onSubmit={formik.handleSubmit}
// //             >
// //               <Stack spacing={3}>
// //                 <TextField
// //                   error={!!(formik.touched.name && formik.errors.name)}
// //                   fullWidth
// //                   helperText={formik.touched.name && formik.errors.name}
// //                   label="Name"
// //                   name="name"
// //                   onBlur={formik.handleBlur}
// //                   onChange={formik.handleChange}
// //                   value={formik.values.name}
// //                 />
// //                 <TextField
// //                   error={!!(formik.touched.email && formik.errors.email)}
// //                   fullWidth
// //                   helperText={formik.touched.email && formik.errors.email}
// //                   label="Email Address"
// //                   name="email"
// //                   onBlur={formik.handleBlur}
// //                   onChange={formik.handleChange}
// //                   type="email"
// //                   value={formik.values.email}
// //                 />
// //                 <TextField
// //                   error={!!(formik.touched.password && formik.errors.password)}
// //                   fullWidth
// //                   helperText={formik.touched.password && formik.errors.password}
// //                   label="Password"
// //                   name="password"
// //                   onBlur={formik.handleBlur}
// //                   onChange={formik.handleChange}
// //                   type="password"
// //                   value={formik.values.password}
// //                 />
// //               </Stack>
// //               {formik.errors.submit && (
// //                 <Typography
// //                   color="error"
// //                   sx={{ mt: 3 }}
// //                   variant="body2"
// //                 >
// //                   {formik.errors.submit}
// //                 </Typography>
// //               )}
// //               <Button
// //                 fullWidth
// //                 size="large"
// //                 sx={{ mt: 3 }}
// //                 type="submit"
// //                 variant="contained"
// //               >
// //                 Continue
// //               </Button>
// //             </form>
// //           </div>
// //         </Box>
// //       </Box>
// //     </>
// //     )
// // }

// // export default Register;
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [registrationError, setRegistrationError] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    role: ['user'], // Varsayılan olarak 'user' rolünü atadık
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:8085/api/auth/signup', userData);

  //     if (response.status === 200) {
  //       alert('Kullanıcı başarıyla kaydedildi.');
  //       // Başka bir işlem yapabilirsiniz, örneğin kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
  //       setUserData({
  //         name: '',
  //         surname: '',
  //         username: '',
  //         email: '',
  //         password: '',
  //         role: ['user'], 
  //       });
  //     }
  //   } catch (error) {
  //     alert('Kullanıcı kaydedilirken bir hata oluştu.');
  //     console.error(error);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      name:'',
      surname:'',
      username: '',
      email: '',
      password: '',
      role: ['user'],
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .max(255)
      .required('Name is required'),
      surname: Yup
      .string()
      .max(255)
      .required('Surname is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      username: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .min(6)
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://localhost:8085/api/auth/signup', values);
    
        if (response.status === 200) {
          alert('Kullanıcı başarıyla kaydedildi.');
          setSubmitting(false); // Formun submit durumunu sıfırlar
          setUserData({
            name:'',
            surname:'',
            username: '',
            email: '',
            password: '',
            role: ['user'], // 'user' rolünü varsayılana geri döndürür
          });
        }
      } catch (error) {
        alert('Kullanıcı kaydedilirken bir hata oluştu.');
        console.error(error);
        setSubmitting(false); // Formun submit durumunu sıfırlar
      }
    }
    
  });

  return (

   <>
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

   <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          background:'white',
          width: '500px',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Kayıt ol
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                align="center"
              >
                Zaten hesabınız var mı? 
                &nbsp;
                <Link to="/" className="nav-link">
                        <i class="fas fa-fw fa-user-md"></i>
                        <span>Giriş Yap</span>
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Adı"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                />
                 
                <TextField
                  error={!!(formik.touched.surname && formik.errors.surname)}
                  fullWidth
                  helperText={formik.touched.surname && formik.errors.surname}
                  label="Soyadı"
                  name="surname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
                />
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Kullanıcı adı"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                   type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Parola"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                /> 
                 {/* Role alanını gizledik çünkü "user" rolünü içeren bir HashSet kullanıyoruz */}
                 <input type="hidden" name="role" value="user" />
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
              {registrationError && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {registrationError}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Kayıt ol
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      </Grid>

       </Grid>
      </Grid>
    </>
  );
};

export default Register;
///////OnemliM
{/* <Box
sx={{
  flex: '1 1 auto',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center'
}}
>
<Box
  sx={{
    maxWidth: 550,
    px: 3,
    py: '100px',
    width: '100%'
  }}
>
  <div>
    <Stack
      spacing={1}
      sx={{ mb: 3 }}
    >
      <Typography variant="h4">
        Register
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        Already have an account?
        &nbsp;
        <Link to="/" className="nav-link">
                <i class="fas fa-fw fa-user-md"></i>
                <span>Login</span>
        </Link>
      </Typography>
    </Stack>
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={3}>
      <TextField
          error={!!(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
        />
         
        <TextField
          error={!!(formik.touched.surname && formik.errors.surname)}
          fullWidth
          helperText={formik.touched.surname && formik.errors.surname}
          label="Surname"
          name="surname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.surname}
        />
        <TextField
          error={!!(formik.touched.username && formik.errors.username)}
          fullWidth
          helperText={formik.touched.username && formik.errors.username}
          label="Username"
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <TextField
          error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
           type="email"
          value={formik.values.email}
        />
        <TextField
          error={!!(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        /> 
         <input type="hidden" name="role" value="user" />
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
      {registrationError && (
        <Typography
          color="error"
          sx={{ mt: 3 }}
          variant="body2"
        >
          {registrationError}
        </Typography>
      )}
      <Button
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
      >
        Continue
      </Button>
    </form>
  </div>
</Box>
</Box>
</> */}
////
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user', // Varsayılan olarak 'user' rolünü atadık
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8089/api/auth/signup', userData);

//       if (response.status === 200) {
//         alert('Kullanıcı başarıyla kaydedildi.');
//         // Başka bir işlem yapabilirsiniz, örneğin kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
//       }
//     } catch (error) {
//       alert('Kullanıcı kaydedilirken bir hata oluştu.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Kullanıcı Kaydı</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Kullanıcı Adı:</label>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Şifre:</label>
//           <input
//             type="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Rol:</label>
//           <select
//             name="role"
//             value={userData.role}
//             onChange={handleChange}
//           >
//             <option value="user">Kullanıcı</option>
//             <option value="admin">Admin</option>
//             {/* Diğer rolleri buraya ekleyebilirsiniz */}
//           </select>
//         </div>
//         <button type="submit">Kaydet</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: ['user'], // Varsayılan olarak 'user' rolünü atadık
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8089/api/auth/signup', userData);

//       if (response.status === 200) {
//         alert('Kullanıcı başarıyla kaydedildi.');
//         // Başka bir işlem yapabilirsiniz, örneğin kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
//         setUserData({
//           username: '',
//           email: '',
//           password: '',
//           role: ['user'], 
//         });
//       }
//     } catch (error) {
//       alert('Kullanıcı kaydedilirken bir hata oluştu.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//     <h2>Kullanıcı Kaydı</h2>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Kullanıcı Adı:</label>
//         <input
//           type="text"
//           name="username"
//           value={userData.username}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="text"
//           name="email"
//           value={userData.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Şifre:</label>
//         <input
//           type="text"
//           name="password"
//           value={userData.password}
//           onChange={handleChange}
//         />
//       </div>
//       {/* Role alanını gizledik çünkü "user" rolünü içeren bir HashSet kullanıyoruz */}
//       <input type="hidden" name="role" value="user" />
//       <button type="submit">Kaydet</button>
//     </form>
//   </div>
// );
  
// };

// export default Register;
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Box, Button, Stack, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [registrationError, setRegistrationError] = useState(null);

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       username: '',
//       password: '',
//       role:''
//     },
//     validationSchema: Yup.object({
//       email: Yup
//         .string()
//         .email('Must be a valid email')
//         .max(255)
//         .required('Email is required'),
//       username: Yup
//         .string()
//         .max(255)
//         .required('Name is required'),
//       password: Yup
//         .string()
//         .max(255)
//         .required('Password is required'),
//        role: Yup
//         .string()
//         .max(255)
//         .required('Role is required')
//     }),
//     onSubmit: (values) => {
//       axios.post('http://localhost:8089/api/auth/signup', values)
//         .then((response) => {
//           console.log('Başarılı kayıt!', response.data);
//           // Kullanıcıyı başka bir sayfaya yönlendirebilirsiniz
//         })
//         .catch((error) => {
//           console.error('Hata:', error);
//           if (error.response && error.response.data) {
//             setRegistrationError(error.response.data.message);
//           } else {
//             setRegistrationError('Bir hata oluştu. Lütfen tekrar deneyin.');
//           }
//         });
//     }
//   });

//   return (
//    <>
//    <Box
//         sx={{
//           flex: '1 1 auto',
//           alignItems: 'center',
//           display: 'flex',
//           justifyContent: 'center'
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 550,
//             px: 3,
//             py: '100px',
//             width: '100%'
//           }}
//         >
//           <div>
//             <Stack
//               spacing={1}
//               sx={{ mb: 3 }}
//             >
//               <Typography variant="h4">
//                 Register
//               </Typography>
//               <Typography
//                 color="text.secondary"
//                 variant="body2"
//               >
//                 Already have an account?
//                 &nbsp;
//                 <Link to="/login" className="nav-link">
//                         <i class="fas fa-fw fa-user-md"></i>
//                         <span>Login</span>
//                 </Link>
//               </Typography>
//             </Stack>
//             <form
//               noValidate
//               onSubmit={formik.handleSubmit}
//             >
//               <Stack spacing={3}>
//                 <TextField
//                   error={!!(formik.touched.username && formik.errors.username)}
//                   fullWidth
//                   helperText={formik.touched.username && formik.errors.username}
//                   label="Name"
//                   name="username"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.username}
//                 />
//                 <TextField
//                   error={!!(formik.touched.email && formik.errors.email)}
//                   fullWidth
//                   helperText={formik.touched.email && formik.errors.email}
//                   label="Email Address"
//                   name="email"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   // type="text"
//                   value={formik.values.email}
//                 />
//                 <TextField
//                   error={!!(formik.touched.password && formik.errors.password)}
//                   fullWidth
//                   helperText={formik.touched.password && formik.errors.password}
//                   label="Password"
//                   name="password"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   // type="text"
//                   value={formik.values.password}
//                 />
//                  <TextField
//                   error={!!(formik.touched.role && formik.errors.role)}
//                   fullWidth
//                   helperText={formik.touched.role && formik.errors.role}
//                   label="role"
//                   name="role"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   // type="text"
//                   value={formik.values.role}
//                 />
//               </Stack>
//               {formik.errors.submit && (
//                 <Typography
//                   color="error"
//                   sx={{ mt: 3 }}
//                   variant="body2"
//                 >
//                   {formik.errors.submit}
//                 </Typography>
//               )}
//               {registrationError && (
//                 <Typography
//                   color="error"
//                   sx={{ mt: 3 }}
//                   variant="body2"
//                 >
//                   {registrationError}
//                 </Typography>
//               )}
//               <Button
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3 }}
//                 type="submit"
//                 variant="contained"
//               >
//                 Continue
//               </Button>
//             </form>
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Register;