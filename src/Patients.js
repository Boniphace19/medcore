import React, { useContext, useState } from 'react';
import { PatientsContext } from './PatientsContext';
import { AppointmentsContext } from './AppointmentsContext';
import './styles/Patients.css';

const Patients = () => {
  const { patients, addPatient, updatePatient, removePatient } = useContext(PatientsContext);
  const { addAppointment } = useContext(AppointmentsContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', dob: '', doctor: '', status: '' });
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', doctor: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newId = `medcorepatient#${patients.length + 1}`; // Generate Patient ID in the desired format
    addPatient({ id: newId, ...newPatient });
    setShowModal(false);
    setNewPatient({ name: '', dob: '', doctor: '', status: '' });
  };

  const handleEditPatient = (id) => {
    const patientToEdit = patients.find((patient) => patient.id === id);
    setCurrentPatientId(id);
    setNewPatient(patientToEdit);
    setShowEditModal(true);
  };

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    updatePatient(currentPatientId, newPatient);
    setShowEditModal(false);
    setNewPatient({ name: '', dob: '', doctor: '', status: '' });
  };

  const handleRemovePatient = (id) => {
    removePatient(id);
  };

  const handleAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleAddAppointment = (e, patientId) => {
    e.preventDefault();
    addAppointment({ ...newAppointment, patientId, id: `${patientId}-${newAppointment.date}-${newAppointment.time}` });
    setShowAppointmentModal(false);
    setNewAppointment({ date: '', time: '', doctor: '' });
  };

  return (
    <div className="patients-container">
      <h1>Patients</h1>
      <div className="patients-header">
        <h2>Total Patients: {patients.length}</h2>
        <button onClick={() => setShowModal(true)}>Add New Patient</button>
      </div>

      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Primary Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.doctor}</td>
                <td>{patient.status}</td>
                <td>
                  <button onClick={() => handleEditPatient(patient.id)}>Edit</button>
                  <button onClick={() => handleRemovePatient(patient.id)}>Remove</button>
                  <button
                    onClick={() => {
                      setShowAppointmentModal(true);
                      setNewAppointment({ ...newAppointment, patientId: patient.id });
                    }}
                  >
                    Add Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Patient</h2>
            <form onSubmit={handleAddPatient}>
              <label>
                Name:
                <input type="text" name="name" value={newPatient.name} onChange={handleInputChange} required />
              </label>
              <label>
                Date of Birth:
                <input type="date" name="dob" value={newPatient.dob} onChange={handleInputChange} required />
              </label>
              <label>
                Primary Doctor:
                <input type="text" name="doctor" value={newPatient.doctor} onChange={handleInputChange} required />
              </label>
              <label>
                Status:
                <select name="status" value={newPatient.status} onChange={handleInputChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <button type="submit">Add Patient</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Patient</h2>
            <form onSubmit={handleUpdatePatient}>
              <label>
                Name:
                <input type="text" name="name" value={newPatient.name} onChange={handleInputChange} required />
              </label>
              <label>
                Date of Birth:
                <input type="date" name="dob" value={newPatient.dob} onChange={handleInputChange} required />
              </label>
              <label>
                Primary Doctor:
                <input type="text" name="doctor" value={newPatient.doctor} onChange={handleInputChange} required />
              </label>
              <label>
                Status:
                <select name="status" value={newPatient.status} onChange={handleInputChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <button type="submit">Update Patient</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Appointment</h2>
            <form onSubmit={(e) => handleAddAppointment(e, newAppointment.patientId)}>
              <label>
                Date:
                <input type="date" name="date" value={newAppointment.date} onChange={handleAppointmentInputChange} required />
              </label>
              <label>
                Time:
                <input type="time" name="time" value={newAppointment.time} onChange={handleAppointmentInputChange} required />
              </label>
              <label>
                Doctor:
                <input type="text" name="doctor" value={newAppointment.doctor} onChange={handleAppointmentInputChange} required />
              </label>
              <button type="submit">Add Appointment</button>
              <button type="button" onClick={() => setShowAppointmentModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
