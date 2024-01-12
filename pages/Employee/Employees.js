import React from 'react';
import MenuItem from '../components/MenuItem/MenuItem';
import EmployeeList from './EmployeeList/EmployeeList';

const Employees = () => {
    return (
        <div className='mx-3'>
            <MenuItem />
            <EmployeeList />
        </div>
    );
};

export default Employees;