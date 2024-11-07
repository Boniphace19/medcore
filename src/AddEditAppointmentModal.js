import React, { useState, useEffect } from 'react';

const AddEditAppointmentModal = ({ appointment, onSave, onEdit, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    doctor: '',
    type: '',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointment) {
      onEdit({ ...formData, id: appointment.id });
    } else {
      onSave({ ...formData, id: Date.now() }); // Generate a simple unique ID
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{appointment ? 'Edit Appointment' : 'Add Appointment'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Patient Name:
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
          </label>
          <label>
            Date:
            <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>
            Doctor:
            <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} required />
          </label>
          <label>
            Type:
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />
          </label>
          <label>
            Notes:
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditAppointmentModal;
