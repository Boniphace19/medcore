import React, { createContext, useState } from 'react';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  const updateAppointment = (id, updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => (appointment.id === id ? updatedAppointment : appointment))
    );
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, updateAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
