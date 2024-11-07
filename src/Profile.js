import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import './styles/Profile.css';
import { useRole } from './RoleContext'; // Import useRole

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [permissions] = useState(['View Patients', 'Manage Appointments', 'Access Billing']);
  const [activityLog] = useState([
    { action: 'Viewed patient record', timestamp: '2024-11-05 10:30 AM' },
    { action: 'Scheduled an appointment', timestamp: '2024-11-04 03:15 PM' },
  ]);
  const { role } = useRole(); // Get role from RoleContext

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || 'Unknown User',
          email: user.email,
        });
      } else {
        setUserInfo({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePasswordChange = () => {
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          alert("Password changed successfully.");
          setNewPassword('');
          setCurrentPassword('');
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          alert("Failed to update password. Please try again.");
        });
    } else {
      alert("User is not authenticated.");
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      {/* User Information Section */}
      <div className="user-info-section">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>

      {/* Change Password Section */}
      <div className="change-password-section">
        <h2>Change Password</h2>
        <div className="password-input-container">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <span
            className="toggle-password-visibility"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? '👁️' : '🙈'}
          </span>
        </div>
        <div className="password-input-container">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="toggle-password-visibility"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? '👁️' : '🙈'}
          </span>
        </div>
        <button onClick={handlePasswordChange}>Save Changes</button>
      </div>

      {/* Role and Permissions Section */}
      <div className="role-permissions-section">
        <h2>Role and Permissions</h2>
        <p><strong>Role:</strong> {role || 'Not defined'}</p> {/* Display role from RoleContext */}
        <h3>Permissions Overview:</h3>
        <ul>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
      </div>

      {/* Activity Log Section */}
      <div className="activity-log-section">
        <h2>Activity Log</h2>
        <ul>
          {activityLog.map((entry, index) => (
            <li key={index}>
              {entry.action} - {entry.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
