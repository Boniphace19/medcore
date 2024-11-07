import React, { useContext, useState } from 'react';
import { AppointmentsContext } from './AppointmentsContext';
import './styles/Appointments.css';

const Appointments = () => {
  const { appointments } = useContext(AppointmentsContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientId.toString().includes(searchTerm) || appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Manage Appointments</h1>
        <p>View, schedule, and edit patient appointments.</p>
      </div>
      <div className="appointments-action-bar">
        <input
          type="text"
          placeholder="Search appointments..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="appointments-overview">
        <div className="upcoming-appointments">Upcoming Appointments: {appointments.length}</div>
        <div className="total-appointments">Total Appointments: {appointments.length}</div>
      </div>
      <div className="appointments-list">
        <h2>Appointments List</h2>
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientId}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
