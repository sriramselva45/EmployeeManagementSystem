import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employeeToEdit = location.state?.employeeToEdit || null;
    const [name, setName] = useState(employeeToEdit?.name || '');
    const [age, setAge] = useState(employeeToEdit?.age || '');
    const [position, setPosition] = useState(employeeToEdit?.position || '');
    const [department, setDepartment] = useState(employeeToEdit?.department || '');
    const [contact, setContact] = useState(employeeToEdit?.contact || '');
    const [email, setEmail] = useState(employeeToEdit?.email || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const employeeData = {
        name,
        age,
        position,
        department,
        contact,
        email,
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            const submitEmployee = async () => {
                try {
                    const response = await fetch(
                        employeeToEdit
                            ? `http://localhost:8000/employees/${employeeToEdit.id}`
                            : `http://localhost:8000/employees`,
                        {
                            method: employeeToEdit ? 'PUT' : 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(employeeData),
                        }
                    );

                    if (response.ok) {
                        alert(
                            employeeToEdit
                                ? 'Employee info updated successfully'
                                : 'New employee added successfully'
                        );
                        navigate('/home');
                    } else {
                        throw new Error('Failed to save employee');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                } finally {
                    setName('');
                    setAge('');
                    setPosition('');
                    setDepartment('');
                    setContact('');
                    setEmail('');
                    setIsSubmitting(false);
                }
            };

            submitEmployee();
        }
    }, [isSubmitting, employeeToEdit, employeeData, navigate]);

    return (
        <div className='addEmp-container'>
            <h2>{employeeToEdit ? 'Edit Employee Details' : 'Add Employee Details'}</h2>
            <form onSubmit={submitHandler} className='addEmp-form'>
                <div className='addEmp-input-div'>
                    <input required type='text' placeholder='Employee Name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='addEmp-input-div'>
                    <input required type='number' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className='addEmp-input-div'>
                    <input required type='text' placeholder='Designation/ Position' value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className='addEmp-input-div'>
                    <input required type='text' placeholder='Department' value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className='addEmp-input-div'>
                    <input required type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='addEmp-input-div'>
                    <input required type='tel' placeholder='Contact Number' value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <button className='AddEmp-button' type='submit' disabled={isSubmitting}>
                    {employeeToEdit ? 'Update Employee' : 'Add Employee'}
                </button>
                <button type='button' className="back-button" onClick={() => navigate('/home')}>Back</button>
            </form>
        </div>
    );
};

export default AddEmployee;
