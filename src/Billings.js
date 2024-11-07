import React, { useState } from 'react';
import { useBillings } from './BillingsContext';
import './styles/Billings.css';

const Billings = () => {
  const { invoices, setInvoices } = useBillings(); // Access invoices from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    patientName: '',
    issueDate: '',
    dueDate: '',
    amount: '',
    status: 'unpaid',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to generate a unique invoice number
  const generateInvoiceNumber = () => {
    return `INV-${Date.now()}`;
  };

  // Function to handle invoice submission
  const handleGenerateInvoice = (e) => {
    e.preventDefault();

    const newInvoice = {
      invoiceNumber: generateInvoiceNumber(),
      ...invoiceDetails,
    };

    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    setIsModalOpen(false); // Close the modal after generating invoice
    setInvoiceDetails({
      patientName: '',
      issueDate: '',
      dueDate: '',
      amount: '',
      status: 'unpaid',
    }); // Reset input fields
  };

  // Function to toggle invoice status
  const toggleStatus = (index) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) => {
        if (i === index) {
          return {
            ...invoice,
            status: invoice.status === 'paid' ? 'unpaid' : 'paid',
          };
        }
        return invoice;
      })
    );
  };

  // Calculate Total Revenue, Outstanding Balance, and Overdue Invoices
  const totalRevenue = invoices.reduce((acc, invoice) => {
    return invoice.status === 'paid' ? acc + Number(invoice.amount) : acc;
  }, 0);

  const outstandingBalance = invoices.reduce((acc, invoice) => {
    return invoice.status === 'unpaid' ? acc + Number(invoice.amount) : acc;
  }, 0);

  const overdueInvoices = invoices.filter((invoice) => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return invoice.status === 'unpaid' && dueDate < today;
  }).length;

  return (
    <div className="billings-container">
      {/* Page Title and Summary */}
      <div className="billings-header">
        <h1>Billing and Invoices</h1>
        <p>Manage patient billing, view invoice history, and track outstanding balances.</p>
      </div>

      {/* Action Bar */}
      <div className="billings-action-bar">
        <button className="generate-invoice-btn" onClick={() => setIsModalOpen(true)}>Generate Invoice</button>
        <select className="filter-dropdown">
          <option value="">Filter by...</option>
          <option value="status">Status</option>
          <option value="date">Date</option>
          <option value="patient">Patient</option>
        </select>
        <input 
          type="text" 
          placeholder="Search invoices..." 
          className="search-bar" 
        />
      </div>

      {/* Billing Summary Section */}
      <div className="billing-summary">
        <div className="summary-item">
          <h3>Total Revenue</h3>
          <p>Tsh {totalRevenue.toFixed(2)}</p> {/* Display dynamic total revenue */}
        </div>
        <div className="summary-item">
          <h3>Outstanding Balance</h3>
          <p>Tsh {outstandingBalance.toFixed(2)}</p> {/* Display dynamic outstanding balance */}
        </div>
        <div className="summary-item">
          <h3>Overdue Invoices</h3>
          <p>{overdueInvoices}</p> {/* Display dynamic count of overdue invoices */}
        </div>
      </div>

      {/* Main Invoice Management Area */}
      <div className="invoice-table">
        <h2>Invoices List</h2>
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Patient Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount (Tsh)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.patientName}</td>
                  <td>{invoice.issueDate}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{`Tsh ${invoice.amount}`}</td>
                  <td>
                    <span className={`status ${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(index)}>
                      Mark as {invoice.status === 'paid' ? 'Unpaid' : 'Paid'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No invoices available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Generating Invoice */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Generate Invoice</h2>
            <form onSubmit={handleGenerateInvoice}>
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={invoiceDetails.patientName}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="issueDate"
                placeholder="Issue Date"
                value={invoiceDetails.issueDate}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dueDate"
                placeholder="Due Date"
                value={invoiceDetails.dueDate}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={invoiceDetails.amount}
                onChange={handleChange}
                required
              />
              <div>
                <button type="submit">Create Invoice</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billings;
