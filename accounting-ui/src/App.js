// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Account from './components/Account';
// import Overview from './components/Overview';
// import Income from './components/Income';
// import Expense from './components/Expense';
// import Investment  from './components/Investment';
// import Dashboard from './Dashboard';
// import Navbar from './components/sections/Navbar';

// function App() {
//   const [token, setToken] = useState('');
//   const handleLogin = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem('token',newToken);
//   };
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if(storedToken){
//       setToken(storedToken);
//     }
//   },[]);

//   return (
//     <div className="App">
//       {token ? (
//  <Router> 
//  <Routes>
//  <Route path="/account" element={<Account />} />
//                <Route path="/overview" element={<Overview />} />
//                <Route path="/income" element={<Income/>} />
//                 <Route path="/expense" element={<Expense />} />
//                  <Route path="/investment" element={<Investment />} />
//  </Routes>

// </Router>
//      ):(
//       < Login onLogin = {handleLogin}/>
//      ) }

// </div>
//   );
// }

// // export default App;
// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Account from './components/Account';
// import Overview from './components/Overview';
// import Income from './components/Income';
// import Expense from './components/Expense';
// import Investment  from './components/Investment';
// function App() {

 

//   return (
//     // <div className={'dark-mode'}>
//     <div className="App">
    
//           <Router>
//           <Routes>
//             <Route path = "/account" element= {<Account/>}/>
//             <Route path="/login" element={<Login/>} />
//             <Route path="/register" element={<Register />} />
//             <Route path = "/overview" element = {<Overview/>} />
//             <Route path="/income" element = {<Income/>}></Route>
//             <Route path = "/expense" element = {<Expense/>}/>
//             <Route path = "/investment" element= {<Investment/>}/>

//           </Routes>
//         </Router>
//         </div>
     
//     // </div>
//   );
// }

// export default App;
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Overview from './components/Overview';
import Income from './components/Income';
import Expense from './components/Expense';
import Investment  from './components/Investment';
import Dashboard from './Dashboard';
import Navbar from './components/sections/Navbar';
function App() {
 
  const[token, setToken] = useState('');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  useEffect(() =>  {
    const storedToken = localStorage.getItem('token');
    if(storedToken) {
      setToken(storedToken);
    }
  },[]);
  setTimeout(function() {
    localStorage.removeItem('token');
    window.location.href = '/';

  }, 3600000); 

    return (
    <div>
    { token ? (
<Router>
<div className="d-flex">
 <Dashboard/>  
 <div id="content-wrapper" className="d-flex flex-column">
   <div id="content">
   <Navbar />
 <div className="container-fluid d-flex justify-content-center align-items-center">
       <Routes>
        
            <Route path = "/account" element= {<Account/>}/>
             {/* <Route path="/register" element={<Register />} /> */}
            <Route path = "/overview" element = {<Overview/>} />
             <Route path="/income" element = {<Income/>}></Route>
             <Route path = "/expense" element = {<Expense/>}/>
             <Route path = "/investment" element= {<Investment/>}/>
       </Routes>
     </div>
   </div>
 </div>
</div>
</Router>
    ): (
      
      <Router>
      <Routes>
        <Route path="" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />         
      </Routes>
    </Router>
    ) 
    }     
  </div>
  );
};
export default App;
// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Account from './components/Account';
// import Overview from './components/Overview';
// import Income from './components/Income';
// import Expense from './components/Expense';
// import Investment from './components/Investment';
// import Dashboard from './Dashboard';
// import Navbar from './components/sections/Navbar';

// function App() {
//   const [token, setToken] = useState('');

//   const handleLogin = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem('token', newToken);
//   }

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/register" element={<Register />} />
//           {token ? (
//             <Route path="/*" element={redirectDashboard()} />
//           ) : (
//             <Route path="/*" element={redirectLogin()} />
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );

//   function redirectDashboard() {
//     return (
//       <div className="d-flex">
//         <Dashboard />
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Navbar />
//             <div className="container-fluid d-flex justify-content-center align-items-center">
//               <Routes>
//                 <Route path="/account" element={<Account />} />
//                 <Route path="/overview" element={<Overview />} />
//                 <Route path="/income" element={<Income/>} />
//                 <Route path="/expense" element={<Expense />} />
//                 <Route path="/investment" element={<Investment />} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function redirectLogin() {
//     return (

           
//          <Route path="/login" element={<Login onLogin={handleLogin} />} />
  
 
    
//     )
//   }
// }

// export default App;
