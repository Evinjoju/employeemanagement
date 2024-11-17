import React from 'react';

const EmployeeList = ({ employees, deleteEmployee, setEditingEmployee }) => {
  return (
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
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.status}</td>
            <td>
              <button onClick={() => setEditingEmployee(employee)}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)} className='delete'>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
