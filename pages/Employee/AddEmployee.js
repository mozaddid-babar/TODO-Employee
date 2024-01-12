import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { IoMdArrowBack } from 'react-icons/io';
import Swal from 'sweetalert2';

const AddEmployee = () => {
    const { employees, setEmployees, addEmployees } = useContext(AuthContext);
    const initialRender = useRef(true);
    const [employeeId, setEmployeeId] = useState(() => {
        // Find the highest existing employee ID or start from 1 if no employees exist
        const highestEmployeeId = Math.max(...employees.map(employee => employee.id), 0);
        return highestEmployeeId + 1;
    });


    const handleAddEmployee = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        // const employeeId = form.employeeId.value;
        const email = form.email.value;
        const designation = form.designation.value;
        const phone = form.phone.value;

        const employeeDetails = {
            id: employeeId,
            name: name,
            email: email,
            designation: designation,
            phone: phone,
        };

        setEmployees([...employees, employeeDetails]);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee Added Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        form.reset();


    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        addEmployees(employees);
    }, [employees]);


    return (
        <div className='container'>
            <div className='fw-bold my-4'><Link href='/' className='bg-primary text-white text-decoration-none px-4 py-2 rounded' ><IoMdArrowBack className='me-2' />Back To Home</Link></div>
            <form onSubmit={handleAddEmployee} className='employeeForm row'>
                <div className='col'>
                    {/* <label for="exampleFormControlInput1">Employee Id</label>
                    <input type="text" name='employeeId' placeholder='Enter Employee Id' className="form-control" id="exampleFormControlInput1" /><br /> */}
                    <label for="exampleFormControlInput1">Name</label>
                    <input type="text" name='name' placeholder='Enter Name' className="form-control" id="exampleFormControlInput1" /><br />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className='form-control' name='phone' placeholder='Enter phone' /><br />

                </div>
                <div className='col'>
                    <label for="exampleFormControlInput1">Email</label>
                    <input type="email" className='form-control' name='email' placeholder='Enter Email' /><br />
                    <label htmlFor="designation">Designation</label>
                    <input type="text" className='form-control' name='designation' placeholder='Enter designation' /><br />
                </div>

                <input type="submit" className='bg-warning fw-bold' value='Add Employee' />
            </form>
        </div>
    );
};

export default AddEmployee;