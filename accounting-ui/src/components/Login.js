// import React from 'react';
// import {
//     Alert,
//     Box,
//     Button,
//     FormHelperText,
//     Link,
//     Stack,
//     Tab,
//     Tabs,
//     TextField,
//     Typography
//   } from '@mui/material';
// const Login = () => {
//     return (
//         <>
//         <Head>
//           <title>
//             Login | Devias Kit
//           </title>
//         </Head>
//         <Box
//           sx={{
//             backgroundColor: 'background.paper',
//             flex: '1 1 auto',
//             alignItems: 'center',
//             display: 'flex',
//             justifyContent: 'center'
//           }}
//         >
//           <Box
//             sx={{
//               maxWidth: 550,
//               px: 3,
//               py: '100px',
//               width: '100%'
//             }}
//           >
//             <div>
//               <Stack
//                 spacing={1}
//                 sx={{ mb: 3 }}
//               >
//                 <Typography variant="h4">
//                   Login
//                 </Typography>
//                 <Typography
//                   color="text.secondary"
//                   variant="body2"
//                 >
//                   Don&apos;t have an account?
//                   &nbsp;
//                   <Link
//                     component={NextLink}
//                     href="/auth/register"
//                     underline="hover"
//                     variant="subtitle2"
//                   >
//                     Register
//                   </Link>
//                 </Typography>
//               </Stack>
//               <Tabs
//                 onChange={handleMethodChange}
//                 sx={{ mb: 3 }}
//                 value={method}
//               >
//                 <Tab
//                   label="Email"
//                   value="email"
//                 />
//                 <Tab
//                   label="Phone Number"
//                   value="phoneNumber"
//                 />
//               </Tabs>
//               {method === 'email' && (
//                 <form
//                   noValidate
//                   onSubmit={formik.handleSubmit}
//                 >
//                   <Stack spacing={3}>
//                     <TextField
//                       error={!!(formik.touched.email && formik.errors.email)}
//                       fullWidth
//                       helperText={formik.touched.email && formik.errors.email}
//                       label="Email Address"
//                       name="email"
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                       type="email"
//                       value={formik.values.email}
//                     />
//                     <TextField
//                       error={!!(formik.touched.password && formik.errors.password)}
//                       fullWidth
//                       helperText={formik.touched.password && formik.errors.password}
//                       label="Password"
//                       name="password"
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                       type="password"
//                       value={formik.values.password}
//                     />
//                   </Stack>
//                   <FormHelperText sx={{ mt: 1 }}>
//                     Optionally you can skip.
//                   </FormHelperText>
//                   {formik.errors.submit && (
//                     <Typography
//                       color="error"
//                       sx={{ mt: 3 }}
//                       variant="body2"
//                     >
//                       {formik.errors.submit}
//                     </Typography>
//                   )}
//                   <Button
//                     fullWidth
//                     size="large"
//                     sx={{ mt: 3 }}
//                     type="submit"
//                     variant="contained"
//                   >
//                     Continue
//                   </Button>
//                   <Button
//                     fullWidth
//                     size="large"
//                     sx={{ mt: 3 }}
//                     onClick={handleSkip}
//                   >
//                     Skip authentication
//                   </Button>
//                   <Alert
//                     color="primary"
//                     severity="info"
//                     sx={{ mt: 3 }}
//                   >
//                     <div>
//                       You can use <b>demo@devias.io</b> and password <b>Password123!</b>
//                     </div>
//                   </Alert>
//                 </form>
//               )}
//               {method === 'phoneNumber' && (
//                 <div>
//                   <Typography
//                     sx={{ mb: 1 }}
//                     variant="h6"
//                   >
//                     Not available in the demo
//                   </Typography>
//                   <Typography color="text.secondary">
//                     To prevent unnecessary costs we disabled this feature in the demo.
//                   </Typography>
//                 </div>
//               )}
//             </div>
//           </Box>
//         </Box>
//       </>
//     )
// }

// export default Login;
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Register from './Register';
// import {
//   Alert,
//   Box,
//   Button,
//   FormHelperText,
//   Stack,
//   Tab,
//   Tabs,
//   TextField,
//   Typography
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSkip = async (e) => {
//     // e.preventDefault();
//     // setLoading(true);

//     // try {
//     //   const response = await axios.post('http://localhost:8089/api/auth/signin', { username, password });
//     //   const token = response.data.accessToken;

//     //   localStorage.setItem('token', token);
       
//     //   setLoading(false);
//     // } catch (error) {
//     //   console.error('Kimlik doğrulama hatası:', error.message);
//     //   setLoading(false);
//     // }
//   };
//   const [method, setMethod] = useState('email');
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       password: '',
//       submit: null
//     },
//     validationSchema: Yup.object({
//       name: Yup
//         .string()
//         .max(255)
//         .required('Username is required'),
//       password: Yup
//         .string()
//         .max(255)
//         .required('Password is required')
//     })
//   });

//   const handleMethodChange = (event, newMethod) => {
//     setMethod(newMethod);
//   };


//   return (

//     <>

//     <Box
//       sx={{
//         backgroundColor: 'background.paper',
//         flex: '1 1 auto',
//         alignItems: 'center',
//         display: 'flex',
//         justifyContent: 'center'
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 550,
//           px: 3,
//           py: '100px',
//           width: '100%'
//         }}
//       >
//         <div>
//           <Stack
//             spacing={1}
//             sx={{ mb: 3 }}
//           >
//             <Typography variant="h4">
//               Login
//             </Typography>
//             <Typography
//               color="text.secondary"
//               variant="body2"
//             >
//             Hesabınız yok mu?
//               <Link to="/register" className="nav-link">
//                         <i class="fas fa-fw fa-user-md"></i>
//                         <span>Kayıt ol</span>
//                         </Link>
//             </Typography>
//           </Stack>
//           <Tabs
//             onChange={handleMethodChange}
//             sx={{ mb: 3 }}
//             value={method}
//           >
//             <Tab
//               label="Kullanıcı adı ile giriş"
//               value="name"
//             />
//             <Tab
//               label="Telefon numarası ile giriş"
//               value="phoneNumber"
//             />
//           </Tabs>
//           {method === 'name' && (
//             <form
//               noValidate
//               onSubmit={formik.handleSubmit}
//             >
//               <Stack spacing={3}>
//                 <TextField
//                   error={!!(formik.touched.name && formik.errors.name)}
//                   fullWidth
//                   helperText={formik.touched.name && formik.errors.name}
//                   label="Kullancı adı"
//                   name="name"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="text"
//                   value={formik.values.name}
//                 />
//                 <TextField
//                   error={!!(formik.touched.password && formik.errors.password)}
//                   fullWidth
//                   helperText={formik.touched.password && formik.errors.password}
//                   label="Şifre"
//                   name="password"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="password"
//                   value={formik.values.password}
//                 />
//               </Stack>
//               <FormHelperText sx={{ mt: 1 }}>
//                 Optionally you can skip.
//               </FormHelperText>
//               {formik.errors.submit && (
//                 <Typography
//                   color="error"
//                   sx={{ mt: 3 }}
//                   variant="body2"
//                 >
//                   {formik.errors.submit}
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
//               <Button
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3 }}
//                 onClick={handleSkip}
//               >
//                 Skip authentication
//               </Button>
//             </form>
//           )}
//           {method === 'phoneNumber' && (
//             <div>
//               <Typography
//                 sx={{ mb: 1 }}
//                 variant="h6"
//               >
              
//               </Typography>
//               <Typography color="text.secondary">
//             Bu özellik sonrasında eklenecektir
//               </Typography>
//             </div>
//           )}
//         </div>
//       </Box>
//     </Box>
//   </>
//   );
// }

// export default Login;
    // <>
    //   <Box
    //     sx={{
    //       backgroundColor: 'background.paper',
    //       flex: '1 1 auto',
    //       alignItems: 'center',
    //       display: 'flex',
    //       justifyContent: 'center'
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         maxWidth: 550,
    //         px: 3,
    //         py: '100px',
    //         width: '100%'
    //       }}
    //     >
    //       <div>
    //         <Stack spacing={1} sx={{ mb: 3 }}>
    //           <Typography variant="h4">
    //             LOGIN
    //           </Typography>
    //           <Typography
    //             color="text.secondary"
    //             variant="body2"
    //           >
    //             Hesabınız yok mu?
    //             &nbsp;
    //             <Link
    //               href="/auth/register"
    //               underline="hover"
    //               variant="subtitle2"
    //             >
    //               Kaydolun
    //             </Link>
    //           </Typography>
    //         </Stack>
    //         <Tabs
    //           onChange={handleMethodChange}
    //           sx={{ mb: 3 }}
    //           value={method}
    //         >
          
    //         </Tabs>
    //         {method === 'email' && (
    //           <form>
    //             <Stack spacing={3}>
    //               <TextField
    //                 fullWidth
    //                 label="Kullanıcı Adı"
    //                 name="text"
    //                 type="text"
    //               />
    //               <TextField
    //                 fullWidth
    //                 label="Parola"
    //                 name="password"
    //                 type="password"
    //               />
    //             </Stack>
    //             <Typography
    //               color="error"
    //               sx={{ mt: 3 }}
    //               variant="body2"
    //             >
    //               Giriş hatası mesajı burada gösterilebilir.
    //             </Typography>
    //             <Button
    //               fullWidth
    //               size="large"
    //               sx={{ mt: 3 }}
    //               type="submit"
    //               variant="contained"
    //             >
    //               Devam Et
    //             </Button>

    //           </form>
    //         )}
        
    //       </div>
    //     </Box>
    //   </Box>
    // </>
    // import React, { useState } from 'react';
    // import { useFormik } from 'formik';
    // import * as Yup from 'yup';
    // import axios from 'axios';
    // import {
    //   Box,
    //   Button,
    //   FormHelperText,
    //   Stack,
    //   Tab,
    //   Tabs,
    //   TextField,
    //   Typography
    // } from '@mui/material';
    // import { Link } from 'react-router-dom';


    // const Login = () => {
    //   const [loading, setLoading] = useState(false);
    //   const [method, setMethod] = useState('name');
    
    //   const handleMethodChange = (event, newMethod) => {
    //     setMethod(newMethod);
    //   };
    
    //   const handleSkip = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    
    //     try {
    //       alert('Kimlik doğrulama atlandı. Kullanıcı giriş yaptı gibi kabul ediliyor.');
    //       setLoading(false);
    //     } catch (error) {
    //       console.error('Kimlik doğrulama hatası:', error.message);
    //       setLoading(false);
    //     }
    //   };
    
    //   const formik = useFormik({
    //     initialValues: {
    //       name: '',
    //       password: '',
    //       submit: null
    //     },
    //     validationSchema: Yup.object({
    //       name: Yup
    //         .string()
    //         .max(255)
    //         .required('Kullanıcı adı gereklidir'),
    //       password: Yup
    //         .string()
    //         .max(255)
    //         .required('Şifre gereklidir')
    //     }),
    //     onSubmit: async (values, { setSubmitting }) => {
    //       try {
    //         const response = await axios.post('http://localhost:8085/api/auth/signin', {
    //           username: values.name,
    //           password: values.password
    //         });
    
    //         const token = response.data.accessToken;
    
    //         localStorage.setItem('token', token);
           
    //         setSubmitting(false);
    //       } catch (error) {
    //         console.error('Kimlik doğrulama hatası:', error.message);
    //         setSubmitting(false);
    //       }
    //     }
    //   });
    
    //   return (
    //     <>
    //       <Box
    //         sx={{
    //           backgroundColor: 'background.paper',
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
    //                 Giriş Yap
    //               </Typography>
    //               <Typography
    //                 color="text.secondary"
    //                 variant="body2"
    //               >
    //                 Hesabınız yok mu?
    //                 <Link to="/register" className="nav-link">
    //                   <i class="fas fa-fw fa-user-md"></i>
    //                   <span>Kayıt ol</span>
    //                 </Link>
    //               </Typography>
    //             </Stack>
    //             <Tabs
    //               onChange={handleMethodChange}
    //               sx={{ mb: 3 }}
    //               value={method}
    //             >
    //               <Tab
    //                 label="Kullanıcı adı ile giriş"
    //                 value="name"
    //               />
    //               <Tab
    //                 label="Telefon numarası ile giriş"
    //                 value="phoneNumber"
    //               />
    //             </Tabs>
    //             {method === 'name' && (
    //               <form
    //                 noValidate
    //                 onSubmit={formik.handleSubmit}
    //               >
    //                 <Stack spacing={3}>
    //                   <TextField
    //                     error={!!(formik.touched.name && formik.errors.name)}
    //                     fullWidth
    //                     helperText={formik.touched.name && formik.errors.name}
    //                     label="Kullancı adı"
    //                     name="name"
    //                     onBlur={formik.handleBlur}
    //                     onChange={formik.handleChange}
    //                     type="text"
    //                     value={formik.values.name}
    //                   />
    //                   <TextField
    //                     error={!!(formik.touched.password && formik.errors.password)}
    //                     fullWidth
    //                     helperText={formik.touched.password && formik.errors.password}
    //                     label="Şifre"
    //                     name="password"
    //                     onBlur={formik.handleBlur}
    //                     onChange={formik.handleChange}
    //                     type="password"
    //                     value={formik.values.password}
    //                   />
    //                 </Stack>
    //                 <FormHelperText sx={{ mt: 1 }}>
    //                   Opsiyonel olarak atlayabilirsiniz.
    //                 </FormHelperText>
    //                 {formik.errors.submit && (
    //                   <Typography
    //                     color="error"
    //                     sx={{ mt: 3 }}
    //                     variant="body2"
    //                   >
    //                     {formik.errors.submit}
    //                   </Typography>
    //                 )}
    //                 <Button
    //                   fullWidth
    //                   size="large"
    //                   sx={{ mt: 3 }}
    //                   type="submit"
    //                   variant="contained"
    //                 >
    //                   Devam
    //                 </Button>
    //                 <Button
    //                   fullWidth
    //                   size="large"
    //                   sx={{ mt: 3 }}
    //                   onClick={handleSkip}
    //                 >
    //                   Kimlik doğrulamayı atla
    //                 </Button>
    //               </form>
    //             )}
    //             {method === 'phoneNumber' && (
    //               <div>
    //                 <Typography
    //                   sx={{ mb: 1 }}
    //                   variant="h6"
    //                 >
    //                   Bu özellik sonrasında eklenecektir
    //                 </Typography>
    //                 <Typography color="text.secondary">
    //                   Bu özellik yakında kullanılabilecek.
    //                 </Typography>
    //               </div>
    //             )}
    //           </div>
    //         </Box>
    //       </Box>
    //     </>
    //   );
    // }

    // export default Login;
    //
    // import React, { useState } from 'react';
    // import { useFormik } from 'formik';
    // import * as Yup from 'yup';
    // import axios from 'axios';
    // import {
    //   Box,
    //   Button,
    //   FormHelperText,
    //   Stack,
    //   Tab,
    //   Tabs,
    //   TextField,
    //   Typography,
    //   Unstable_Grid2,
    //   Grid
    // } from '@mui/material';
    // import { Link } from 'react-router-dom';
    // const Login = () => {
    //   const [loading, setLoading] = useState(false);
    //   const [method, setMethod] = useState('name');
    
    //   const handleMethodChange = (event, newMethod) => {
    //     setMethod(newMethod);
    //   };
    
    //   const handleSkip = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    
    //     try {
    //       alert('Kimlik doğrulama atlandı. Kullanıcı giriş yaptı gibi kabul ediliyor.');
    //       setLoading(false);
    //     } catch (error) {
    //       console.error('Kimlik doğrulama hatası:', error.message);
    //       setLoading(false);
    //     }
    //   };
    
    //   const formik = useFormik({
    //     initialValues: {
    //       name: '',
    //       password: '',
    //       submit: null
    //     },
    //     validationSchema: Yup.object({
    //       name: Yup
    //         .string()
    //         .max(255)
    //         .required('Kullanıcı adı gereklidir'),
    //       password: Yup
    //         .string()
    //         .max(255)
    //         .required('Şifre gereklidir')
    //     }),
    //     onSubmit: async (values, { setSubmitting }) => {
    //       try {
    //         const response = await axios.post('http://localhost:8085/api/auth/signin', {
    //           username: values.name,
    //           password: values.password
    //         });
    
    //         const token = response.data.accessToken;
    
    //         localStorage.setItem('token', token);
           
    //         setSubmitting(false);
    //       } catch (error) {
    //         console.error('Kimlik doğrulama hatası:', error.message);
    //         setSubmitting(false);
    //       }
    //     }
    //   });

      
    //   return (
    //     <>
    //        <Box
    //   component="main"
    //   sx={{
    //     display: 'flex',
    //     flex: '1 1 auto',
     

    //   }}
    // >
    //       <Grid
    //     container
    //     sx={{ flex: '1 1 auto',
    //     background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)'
    // }} 
     

    //   >
    //     <Grid
    //       xs={12}
    //       lg={6}
    //       sx={{
    //         backgroundColor: 'background.paper',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         position: 'relative',
    //        // background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)'
    //       }}
    //     >
    //       <Box
    //         component="header"
    //         sx={{
    //           left: 0,
    //           p: 3,
    //           position: 'fixed',
    //           top: 0,
    //           width: '100%',
    //           background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)'
    //         }}
    //       >         
    //       </Box>
    //       <Box
    //         sx={{
    //           backgroundColor: 'background.paper',
    //           flex: '1 1 auto',
    //           alignItems: 'center',
    //           display: 'flex',
    //           justifyContent: 'center',
    //           //buraya koymabackground: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)'
             
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             maxWidth: 550,
    //             px: 3,
    //             py: '100px',
    //             width: '100%',
    //          //burasının rengi değişecek  
    //           background: '#D8D9DA'
    //           }}
    //         >
    //           <div>
    //             <Stack
    //               spacing={1}
    //               sx={{ mb: 3 }}
    //             >
    //               <Typography variant="h4">
    //                 Giriş Yap
    //               </Typography>
    //               <Typography
          
    //                 variant="body2"
    //               >
    //                 Hesabınız yok mu?
    //                 <Link to="/register" className="nav-link">
    //                   <i class="fas fa-fw fa-user-md"></i>
    //                   <span>Kayıt ol</span>
    //                 </Link>
    //               </Typography>
    //             </Stack>
    //             <Tabs
    //               onChange={handleMethodChange}
    //               sx={{ mb: 3 }}
    //               value={method}
          
    //             >
    //               <Tab
    //                 label="Kullanıcı adı ile giriş"
    //                 value="name"
                  
    //               />
    //               <Tab
    //                 label="Telefon numarası ile giriş"
    //                 value="phoneNumber"
    //               />
    //             </Tabs>
    //             {method === 'name' && (
    //               <form
    //                 noValidate
    //                 onSubmit={formik.handleSubmit}
    //               >
    //                 <Stack spacing={3}>
    //                   <TextField
    //                     error={!!(formik.touched.name && formik.errors.name)}
    //                     fullWidth
    //                     helperText={formik.touched.name && formik.errors.name}
    //                     label="Kullancı adı"
    //                     name="name"
    //                     onBlur={formik.handleBlur}
    //                     onChange={formik.handleChange}
    //                     type="text"
    //                     value={formik.values.name}
                  
    //                   />
    //                   <TextField
    //                     error={!!(formik.touched.password && formik.errors.password)}
    //                     fullWidth
    //                     helperText={formik.touched.password && formik.errors.password}
    //                     label="Şifre"
    //                     name="password"
    //                     onBlur={formik.handleBlur}
    //                     onChange={formik.handleChange}
    //                     type="password"
    //                     value={formik.values.password}
    //                   />
    //                 </Stack>
    //                 <FormHelperText sx={{ mt: 1 }}>
    //                   Opsiyonel olarak atlayabilirsiniz.
    //                 </FormHelperText>
    //                 {formik.errors.submit && (
    //                   <Typography
    //                     color="error"
    //                     sx={{ mt: 3 }}
    //                     variant="body2"
    //                   >
    //                     {formik.errors.submit}
    //                   </Typography>
    //                 )}
    //                 <Button
    //                   fullWidth
    //                   size="large"
    //                   sx={{ mt: 3 }}
    //                   type="submit"
    //                   variant="contained"
    //                 >
    //                   Devam
    //                 </Button>
    //                 <Button
    //                   fullWidth
    //                   size="large"
    //                   sx={{ mt: 3 }}
    //                   onClick={handleSkip}
    //                 >
    //                   Kimlik doğrulamayı atla
    //                 </Button>
    //               </form>
    //             )}
    //             {method === 'phoneNumber' && (
    //               <div>
    //                 <Typography
    //                   sx={{ mb: 1 }}
    //                   variant="h6"
    //                 >
    //                   Bu özellik sonrasında eklenecektir
    //                 </Typography>
    //                 <Typography color="text.secondary">
    //                   Bu özellik yakında kullanılabilecek.
    //                 </Typography>
    //               </div>
    //             )}
    //           </div>
    //         </Box>
    //       </Box>
    //     </Grid>
    //     <Grid
    //       xs={12}
    //       lg={6}
    //       sx={{
    //         alignItems: 'center',
    //         background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
    //         color: 'white',
    //         display: 'flex',
    //         justifyContent: 'center',
    //         '& img': {
    //           maxWidth: '100%'
    //         }
    //       }}
    //     >
    //       <Box sx={{ p: 3 }}>
    //         <Typography
    //           align="center"
    //           color="inherit"
    //           sx={{
    //             fontSize: '24px',
    //             lineHeight: '32px',
    //             mb: 1
    //           }}
    //           variant="h1"
    //         >
    //           Hoşgeldiniz{' '}
    //           <Box
    //             component="a"
    //             sx={{ color: '#15B79E' }}
    //             target="_blank"
    //           >
    //             Bireysel Muhasebe
    //           </Box>
    //         </Typography>
    //         <Typography
    //           align="center"
    //           sx={{ mb: 3 }}
    //           variant="subtitle1"
    //         >
              
    //         </Typography>
    //         <img
    //           alt=""
    //           src="/assets/devias-kit-pro.png"
    //         />
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Box>
     
    //     </>
    //   );
    // }

    // export default Login;
    
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
{/* <Grid
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
                color:"white"
              }}
              variant="subtitle1"
            >
             Finansal Hesaplarınızı Kolaylaştırın!
            </Typography>

      <Grid item xs={12} sm={8} md={6} lg={4} sx= {{}}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Giriş Yap
          </Typography>
          {/* Diğer içerik */}
       
        
//                       <Tabs
//                         onChange={handleMethodChange}
//                         sx={{ mb: 3 }}
//                         value={method}
                
//                       >
//                         <Tab
//                           label="Kullanıcı adı ile giriş"
//                           value="name"
                        
//                         />
//                         <Tab
//                           label="Telefon numarası ile giriş"
//                           value="phoneNumber"
//                         />
//                       </Tabs>
//                       {method === 'name' && (
//                         <form
//                           noValidate
//                           onSubmit={formik.handleSubmit}
//                         >
//                           <Stack spacing={3}>
//                             <TextField
//                               error={!!(formik.touched.name && formik.errors.name)}
//                               fullWidth
//                               helperText={formik.touched.name && formik.errors.name}
//                               label="Kullancı adı"
//                               name="name"
//                               onBlur={formik.handleBlur}
//                               onChange={formik.handleChange}
//                               type="text"
//                               value={formik.values.name}
                        
//                             />
//                             <TextField
//                               error={!!(formik.touched.password && formik.errors.password)}
//                               fullWidth
//                               helperText={formik.touched.password && formik.errors.password}
//                               label="Şifre"
//                               name="password"
//                               onBlur={formik.handleBlur}
//                               onChange={formik.handleChange}
//                               type="password"
//                               value={formik.values.password}
//                             />
//                           </Stack>
//                           <FormHelperText sx={{ mt: 1 }}>
//                             Opsiyonel olarak atlayabilirsiniz.
//                           </FormHelperText>
//                           {formik.errors.submit && (
//                             <Typography
//                               color="error"
//                               sx={{ mt: 3 }}
//                               variant="body2"
//                             >
//                               {formik.errors.submit}
//                             </Typography>
//                           )}
//                           <Button
//                             fullWidth
//                             size="large"
//                             sx={{ mt: 3 }}
//                             type="submit"
//                             variant="contained"
//                           >
//                             Devam
//                           </Button>
//                           <Button
//                             fullWidth
//                             size="large"
//                             sx={{ mt: 3 }}
//                             onClick={handleSkip}
//                           >
//                             Kimlik doğrulamayı atla
//                           </Button>
//                         </form>
//                       )}
//                       {method === 'phoneNumber' && (
//                         <div>
//                           <Typography
//                             sx={{ mb: 1 }}
//                             variant="h6"
//                           >
//                             Bu özellik sonrasında eklenecektir
//                           </Typography>
//                           <Typography color="text.secondary">
//                             Bu özellik yakında kullanılabilecek.
//                           </Typography>
//                         </div>
//                       )}
         
//           {/* Diğer içerik */}
//         </Paper>
//       </Grid>
//       <Grid 
//  item xs={12} sm={8} md={6} lg={4} sx= {{}}
//   >
//     <img
//       alt=""
//       src="/assets/devias-kit-pro.png"
//       style={{ maxWidth: '100%' }}
//     />
//   </Grid>
//     </Grid>

    // </> 
    /**
     *   <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
         
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"
              >
                Devias Kit
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              A professional kit that comes with ready-to-use MUI components.
            </Typography>
            <img
              alt=""
              src="/assets/devias-kit-pro.png"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
     */