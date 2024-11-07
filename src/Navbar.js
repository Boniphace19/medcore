import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import './styles/Navbar.css';
import logo from './assets/medcore.jpg';

const Navbar = () => {
  const [user, setUser] = useState(null); // State for storing user data
  const navigate = useNavigate();

  // Fetch user info (assuming Firebase Authentication stores the user's display name and photo URL)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="MedCore Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/billings">Billing</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-profile">
        {user && (
          <>
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className="profile-picture" />
            )}
            <span className="profile-name">{user.displayName || 'User'}</span>
          </>
        )}
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
