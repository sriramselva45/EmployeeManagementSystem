import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null); 

    useEffect(() => {
        if (!localStorage.getItem('isAuthenticated')) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:8000/employees')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    useEffect(() => {
        if (employeeToDelete) {
            fetch(`http://localhost:8000/employees/${employeeToDelete}`, { method: 'DELETE' })
                .then(() => {
                    alert('Employee Deleted successfully');
                    setData((prevData) => prevData.filter(emp => emp.id !== employeeToDelete));
                    setSelectedEmployee(null);
                })
                .catch((error) => console.error('Error deleting employee:', error))
                .finally(() => setEmployeeToDelete(null)); 
        }
    }, [employeeToDelete]);

    const navigateToAddEmployee = () => {
        navigate('/AddEmployee');
    };

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleEditClick = (employee) => {
        navigate('/AddEmployee', { state: { employeeToEdit: employee } });
    };

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    return (
        <>
            <h2 className='title'>Employee Management System</h2> 
            <div className='AdminPage-container'>
                <div className='AdminPage-buttons'>
                    <button className='AddNewEmp' onClick={navigateToAddEmployee} type='button'>
                        Add New Employee
                    </button>
                    <button className='AdminLogout' onClick={handleLogout} type='button'>
                        Logout
                    </button>
                </div>
                <div className='EmployeeContainer'>
                    <div className='EmployeeList'>
                        <h3>Employee List</h3>
                        {data.map((employee) => (
                            <div
                                key={employee.id}
                                onClick={() => handleEmployeeClick(employee)}
                                className='employee-list-div'
                            >
                                {employee.name} - {employee.position}
                            </div>
                        ))}
                    </div>

                    <div className='EmployeeInfo'>
                        {selectedEmployee ? (
                            <div>
                                <h2>Employee Info</h2>
                                <p><b>Name:</b> {selectedEmployee.name}</p>
                                <p><b>Age:</b> {selectedEmployee.age}</p>
                                <p><b>Position:</b> {selectedEmployee.position}</p>
                                <p><b>Department:</b> {selectedEmployee.department}</p>
                                <p><b>Mobile:</b> {selectedEmployee.contact}</p>
                                <p><b>Email:</b> {selectedEmployee.email}</p>
                                <button onClick={() => handleEditClick(selectedEmployee)}>Edit</button>
                                <button onClick={() => handleDeleteClick(selectedEmployee.id)}>Delete</button>
                            </div>
                        ) : (
                            <p>Click on an employee to see their details</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
