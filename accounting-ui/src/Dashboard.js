import './Dashboard.css';
import { Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
function Dashboard() {
    const [style, setStyle] = useState("navbar-nav bg-dark sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-dark sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-dark sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-dark sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const [token, setToken] = useState('');

    const handleLogin = (newToken) => {
      setToken(newToken);
      localStorage.setItem('token', newToken); 
    };
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken); 
      }
    }, []); 
    return (
        <div style = {{height: '100%'}}>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar">

                        {/*  <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon">
                            {/* <img src={logo} alt="Logo" width="60" height="60" /> */}
                            </div>
                            <div className="sidebar-brand-text mx-3">Bireysel Muhasebe</div>
                            <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                        </div>
                        </a>

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*  <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active"> 
                        <Link to="/overview" className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>ANA SAYFA</span>
                        </Link>
                        </li>

                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />

                        {/*   <!-- Heading --> */}
                        <div className="sidebar-heading">
                            Arayüzler
                        </div>

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        
                        <li className="nav-item">
                        <Link to="/income" className="nav-link">
                        <i class="fas fa-fw fa-calendar-alt"></i>
                        <span>Gelir</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/expense" className="nav-link">
                        <i class="fas fa-fw fa-user-md"></i>
                        <span>Gider</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/investment" className="nav-link">
                        <i class="fas fa-fw fa-user-md"></i>
                        <span>Yatırım</span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/account" className="nav-link">
                        <i class="fas fa-fw fa-user-md"></i>
                        <span>Hesap</span>
                        </Link>
                        </li>
                </ul>
   </div>
</body>
</div>
)
}

export default Dashboard;

