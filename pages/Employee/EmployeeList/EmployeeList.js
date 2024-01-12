import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import EmployeeListItem from './EmployeeListItem';
import Link from 'next/link';

const EmployeeList = () => {
    const { employees, setEmployees } = useContext(AuthContext)
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('employees'));
        if (items) {
            setEmployees(items);
        }
    }, []);
    return (
        <div>
            <div className='text-center fw-bold fs-4 my-4'><Link href='/Employee/AddEmployee' className='bg-primary text-white text-decoration-none px-4 py-2 rounded'>Add Employee</Link></div>
            <h2 className='text-center'>Employee List</h2>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof window !== 'undefined' && employees.map(employee => <EmployeeListItem key={employee.id} employee={employee}></EmployeeListItem>)}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;