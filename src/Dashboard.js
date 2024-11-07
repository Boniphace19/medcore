import React, { useContext } from 'react';
import { PatientsContext } from './PatientsContext';
import { AppointmentsContext } from './AppointmentsContext';
import { useBillings } from './BillingsContext';
import { Link } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { patients } = useContext(PatientsContext);
  const { appointments } = useContext(AppointmentsContext);
  const { invoices } = useBillings();

  // Calculations for the summaries
  const upcomingAppointments = appointments.length;
  const activePatients = patients.filter(patient => patient.status === 'Active').length;
  const totalRevenue = invoices.reduce((acc, invoice) => (
    invoice.status === 'paid' ? acc + Number(invoice.amount) : acc
  ), 0);

  const overdueInvoices = invoices.filter(invoice => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return invoice.status === 'unpaid' && dueDate < today;
  }).length;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="summary-cards">
        <div className="summary-card">
          <h2>Active Patients</h2>
          <p>{activePatients}</p>
          <Link to="/patients">
            <button>View Patients</button>
          </Link>
        </div>
        
        <div className="summary-card">
          <h2>Upcoming Appointments</h2>
          <p>{upcomingAppointments}</p>
          <Link to="/appointments">
            <button>View Appointments</button>
          </Link>
        </div>
        
        <div className="summary-card">
          <h2>Total Revenue</h2>
          <p>Tsh {totalRevenue.toFixed(2)}</p>
          <Link to="/billings">
            <button>View Billings</button>
          </Link>
        </div>
        
        <div className="summary-card">
          <h2>Overdue Invoices</h2>
          <p>{overdueInvoices}</p>
          <Link to="/billings">
            <button>Manage Invoices</button>
          </Link>
        </div>
      </div>
      
      <div className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-action-buttons">
          <Link to="/patients">
            <button>Add New Patient</button>
          </Link>
          <Link to="/appointments">
            <button>Schedule Appointment</button>
          </Link>
          <Link to="/billings">
            <button>Generate Invoice</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
