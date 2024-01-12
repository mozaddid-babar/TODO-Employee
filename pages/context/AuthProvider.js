import React, { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [taskFormCompleted, setTaskFormCompleted] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [canTaskUpdate, setCanTaskUpdate] = useState(false);

    const addEmployees = async (employees) => {
        localStorage.setItem('employees', await (JSON.stringify(employees)));
    }

    // const getEmployees = () => {
    //     JSON.parse(localStorage.getItem('employees'))
    // }

    const updateEmployees = (employees) => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    const removeEmployee = data => {
        localStorage.removeItem(data);
    }



    const AuthInfo = {
        employees,
        setEmployees,
        addEmployees,
        removeEmployee,
        setTaskFormCompleted,
        taskFormCompleted,
        taskCompleted,
        setTaskCompleted,
        canTaskUpdate,
        setCanTaskUpdate
        // getEmployees,
        // handleAddEmployee,

    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;