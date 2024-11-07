import React from 'react';

const AppointmentDetailsModal = ({ appointment, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Appointment Details</h2>
        <p><strong>Patient:</strong> {appointment.patientName}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Doctor:</strong> {appointment.doctor}</p>
        <p><strong>Type:</strong> {appointment.type}</p>
        <p><strong>Notes:</strong> {appointment.notes}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
