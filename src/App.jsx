import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SERVERURL from './services/serverURL';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'active' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${SERVERURL}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      setEmployees([]); // Ensure employees is an array even on error
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addOrUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await axios.put(`${SERVERURL}/${editingEmployee.id}`, formData);
        setEditingEmployee(null);
      } else {
        await axios.post(`${SERVERURL}`, formData);
      }
      setFormData({ name: '', email: '', status: 'active' });
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${SERVERURL}/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  const startEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
  };

  return (
    <div className="container">
      <p>EMPLOYEE MANAGEMENT SYSTEM</p>
      <form onSubmit={addOrUpdateEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className='ev'>
        <button  type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.status}</td>
                <td>
                  <button onClick={() => startEditEmployee(employee)} className="edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => deleteEmployee(employee.id)} className="delete">
                  <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;