import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const DropdownEmployeeSelection = ({ employee, setSelectedEmployee, selectedEmployee }) => {
    const { name, id } = employee;
    // console.log('From Dropdown', employee);
    const { setTaskFormCompleted } = useContext(AuthContext);

    // console.log('selected Employee from dropdwn ', selectedEmployee);
    return (
        <li>
            <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                    setSelectedEmployee(name);
                    setTaskFormCompleted(false);
                }}
            >
                {name}
            </a>
        </li>
    );
};

export default DropdownEmployeeSelection;