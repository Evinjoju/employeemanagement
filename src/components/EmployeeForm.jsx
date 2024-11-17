import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee, editingEmployee, setEditingEmployee, updateEmployee }) => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    status: 'active',
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee({ id: '', name: '', email: '', status: 'active' });
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(employee.id, employee);
    } else {
      addEmployee({ ...employee, id: Date.now() });
    }
    setEmployee({ id: '', name: '', email: '', status: 'active' });
    setEditingEmployee(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        required
      />
      <select name="status" value={employee.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit">{editingEmployee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
