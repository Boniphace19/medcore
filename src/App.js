import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAccess from './UserAccess';
import Dashboard from './Dashboard';
import Patients from './Patients';
import Appointments from './Appointments';
import Billings from './Billings';
import Profile from './Profile';
import Navbar from './Navbar';
import { AppointmentsProvider } from './AppointmentsContext';
import { BillingsProvider } from './BillingsContext';
import { RoleProvider } from './RoleContext'; // Import RoleProvider

const App = () => {
  return (
    <RoleProvider> {/* Wrap with RoleProvider */}
      <AppointmentsProvider>
        <BillingsProvider>
          <Router>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<UserAccess />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/billings" element={<Billings />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Router>
        </BillingsProvider>
      </AppointmentsProvider>
    </RoleProvider>
  );
};

export default App;
