import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import MenuItem from '../components/MenuItem/MenuItem';
import { useRouter } from 'next/router';
import { IoMdArrowBack } from 'react-icons/io';
import DropdownEmployeeSelection from './DropdownEmployeeSelection/DropdownEmployeeSelection';
import ViewEmployeeTask from './ViewEmployeeTask/[id]';

const AvailableEmployees = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('Select Employee');
    const { employees, setEmployees } = useContext(AuthContext);
    const router = useRouter();

    // console.log('employee selected with ', selectedEmployee, ' from available employees');



    return (
        <div className='container'>
            {/* <MenuItem /> */}
            <div className='fw-bold my-4'><Link href='/' className='bg-primary text-white text-decoration-none px-4 py-2 rounded' ><IoMdArrowBack className='me-2' />Back To Home</Link></div>

            <div className="dropdown my-4">
                <button
                    className="btn btn-secondary dropdown-toggle px-5 mb-4"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded='false'
                >
                    {selectedEmployee}
                </button>
                <ul className="dropdown-menu">
                    {
                        employees.map(employee => <DropdownEmployeeSelection key={employee.id} employee={employee} setSelectedEmployee={setSelectedEmployee} selectedEmployee={selectedEmployee} />)
                    }
                </ul>
                {
                    selectedEmployee != 'Select Employee' ? <ViewEmployeeTask selectedEmployee={selectedEmployee} /> : ''
                }
            </div>
            {/* <ul style={{ width: '200px' }} className='ms-5'>
                {
                    employees.map(employee => <li><button onClick={() => {
                        console.log('Employee id from available Employee ', employee?.id);
                        router.push(`/Task/ViewEmployeeTask/${employee.id}`);
                    }} className='mb-2 text-decoration-none'>{employee.name}</button></li>)
                }
            </ul> */}
        </div>
    );
};

export default AvailableEmployees;