import React, { useContext, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const EmployeeListItem = ({ employee }) => {
    const { id, name, email, designation, phone } = employee;
    const { employees, setEmployees, addEmployees } = useContext(AuthContext);
    const router = useRouter();
    // console.log(employees);

    const handleViewEmployee = id => {
        router.push(`/Employee/view/${id}`);
    }
    const handleUpdateEmployee = id => {
        router.push(`/Employee/update/${id}`);
    }

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const item = employees.filter(employee => employee.id !== id);
                console.log(item);
                setEmployees(item);
                addEmployees(item);
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    return (
        <tr>
            <td scope="row">{id}</td>
            <td>{name}</td>
            <td>{designation}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td> <button className='border-1 rounded border-dark-subtle' onClick={() => handleViewEmployee(id)}>
                <FaEye />
            </button></td>
            <td> <button className='border-1 rounded bg-info ' onClick={() => handleUpdateEmployee(id)}>
                <CiEdit />
            </button></td>
            <td><button className='border-1 rounded bg-danger text-white' onClick={() => handleDelete(id)}><RiDeleteBin6Line /></button></td>
        </tr>
    );
};

export default EmployeeListItem;