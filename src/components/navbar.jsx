import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../homepage.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDistributeOpen, setIsDistributeOpen] = useState(false);




  const [username, setUsername] = useState(() => {
    const token = localStorage.getItem('token');
    const uname = localStorage.getItem('username');
    return token && uname ? uname : '';
  });

  const [role, setRole] = useState(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return token && userRole ? userRole : '';
  });


  useEffect(() => {
    const updateUserInfo = () => {
      const token = localStorage.getItem('token');
      const uname = localStorage.getItem('username');
      const userRole = localStorage.getItem('role');
      setUsername(token && uname ? uname : '');
      setRole(token && userRole ? userRole : '');
    };
    window.addEventListener('storage', updateUserInfo);
    window.addEventListener('user-login', updateUserInfo);
    updateUserInfo(); // ensure update on mount
    return () => {
      window.removeEventListener('storage', updateUserInfo);
      window.removeEventListener('user-login', updateUserInfo);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUsername('');
    setRole('');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <a href="#" className="logo" >
              <img src={logo} alt="Logo"/>
            </a>
            <p  className='plogo'>STORE</p>
            <div className="desktop-nav">
              <a href="#" className="nav-link">Support</a>
              <div className="relative">
                <button
                  onClick={() => setIsDistributeOpen(!isDistributeOpen)}
                  className="dropdown-btn"
                >
                  Distribute
                  <svg
                    className={`h-5 w-5 ml-1 transform transition-transform duration-200 ${isDistributeOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDistributeOpen && (
                  <div className="dropdown-menu">
                    <a href="#">Publishing</a>
                    <a href="#">Licensing</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="nav-right">
            <button className="lang-icon" style={{ display: 'none' }}>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 018.666 15c-1.393 0-2.825-.333-4.142-.964m11.531-1.472a18.022 18.022 0 011.205 1.472c1.317.631 2.749.964 4.142.964" />
                <path d="M12 15a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
            </button>

            <div className="nav-right-desktop">
              {role !== 'admin' && (
                <div className="user-profile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="icon">
                    <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88A88.1 88.1 0 0 1 128 216ZM128 80a28 28 0 1 1-28 28A28 28 0 0 1 128 80Zm0 40a12 12 0 1 0-12-12A12 12 0 0 0 128 120Zm48 64a8 8 0 0 1-8 8H88a8 8 0 0 1-8-8 40.09 40.09 0 0 1 40-40A40.09 40.09 0 0 1 168 168Zm-8 0a24.08 24.08 0 0 0-24-24a24.08 24.08 0 0 0-24 24Z" />
                  </svg>
                  <span>{username ? username : ''}</span>
                </div>
              )}
              {role === 'admin' && (
                <Link to="/admin" className="admin-link" style={{ marginRight: '1rem', color: '#f59e42', fontWeight: 'bold', textDecoration: 'none' }}>
                  Admin
                </Link>
              )}
              {username ? (
                <button className="sign-btn" style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/signup" className="sign-btn" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Sign
                </Link>
              )}
            </div>

            <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#" className="mobile-link">Support</a>
            <a href="#" className="mobile-link">Distribute</a>
            <hr className="mobile-separator" />
            <div className="mobile-profile">
              <span style={{ color: '#9ca3af' }}>User:</span>
              <span>{username ? username : ''}</span>
            </div>
            <a href="#" className="download-btn mobile-link" style={{ marginTop: '0.5rem' }}>Download</a>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;