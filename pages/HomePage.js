import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import EmployeeListItem from './Employee/EmployeeList/EmployeeListItem';
import { AuthContext } from './context/AuthProvider';
import TaskList from './components/TaskList/TaskList';
import MenuItem from './components/MenuItem/MenuItem';
import EmployeeList from './Employee/EmployeeList/EmployeeList';

const HomePage = () => {
    const { employees, setEmployees } = useContext(AuthContext)
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('employees'));
        if (items) {
            setEmployees(items);
        }
    }, []);
    console.log(employees);
    return (
        <div className='mx-3'>
            <MenuItem />
            <EmployeeList />

        </div>
    );
};

export default HomePage;