import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PatientsProvider } from './PatientsContext'; // Import the PatientsProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientsProvider>
      <App />
    </PatientsProvider>
  </React.StrictMode>
);

reportWebVitals();
