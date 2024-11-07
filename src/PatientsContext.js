import React, { createContext, useState, useEffect } from 'react';

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    // Load from localStorage or start with an empty array
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });

  useEffect(() => {
    // Save patients to localStorage whenever the patients state changes
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
  };

  const updatePatient = (id, updatedPatient) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedPatient } : patient
      )
    );
  };

  const removePatient = (id) => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
  };

  return (
    <PatientsContext.Provider value={{ patients, addPatient, updatePatient, removePatient }}>
      {children}
    </PatientsContext.Provider>
  );
};
