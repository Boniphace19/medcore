import React, { createContext, useContext, useState } from 'react';

// Create a context for billing
const BillingsContext = createContext();

// Create a provider component
export const BillingsProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]); // Global state for invoices

  return (
    <BillingsContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </BillingsContext.Provider>
  );
};

// Custom hook to use the BillingsContext
export const useBillings = () => {
  return useContext(BillingsContext);
};
