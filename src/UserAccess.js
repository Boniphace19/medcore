import React, { useState, useEffect } from 'react';
import './styles/UserAccess.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRole } from './RoleContext';

const UserAccess = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { setRole: setRoleInContext } = useRole();

  // Check if form data is saved in localStorage and reset it when the app reopens
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFullname(savedData.fullname || '');
      setEmail(savedData.email || '');
      setPassword(savedData.password || '');
      setRole(savedData.role || '');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (role === 'Nurse' || role === 'Doctor') {
        setRoleInContext(role); // Update role in context
        alert(`Welcome, ${role}! Redirecting to your profile...`);
        navigate('/profile');
      } else {
        setError("Access restricted to Nurse and Doctor roles only.");
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: fullname,
      });
      setRoleInContext(role); // Set role in context after signup
      alert("Signup successful! You can now log in.");
      setIsSignup(false);
      setFullname('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      setError("Failed to sign up. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  // Save form data to localStorage when form values change
  useEffect(() => {
    const formData = { fullname, email, password, role };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [fullname, email, password, role]);

  return (
    <div className="login-root">
      <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            {/* Background elements if needed */}
          </div>
        </div>
        <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1>MedCore</h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">{isSignup ? 'Create an account' : 'Sign in to your account'}</span>
                <form id="login-form" onSubmit={isSignup ? handleSignup : handleLogin}>
                  {isSignup && (
                    <div className="field padding-bottom--24">
                      <label htmlFor="fullname">Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field padding-bottom--24">
                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="password-toggle"
                      >
                        {passwordVisible ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  {!isSignup && (
                    <div className="field padding-bottom--24">
                      <label htmlFor="role">Role</label>
                      <select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                      </select>
                    </div>
                  )}
                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="stay-signed-in">
                      <input
                        type="checkbox"
                        name="stay-signed-in"
                        checked={staySignedIn}
                        onChange={() => setStaySignedIn(!staySignedIn)}
                      /> Stay signed in for a week
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input
                      type="submit"
                      name="submit"
                      value={loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Continue')}
                      disabled={loading}
                    />
                  </div>
                  {error && <div className="error">{error}</div>}
                </form>
                <div className="toggle-signup">
                  <span onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                  </span>
                </div>
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <span>© MedCore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccess;
