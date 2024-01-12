import Link from "next/link";
import { useParams } from 'next/navigation'
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";


export default function EmployeeDetails() {
    const params = useParams();
    const router = useRouter();
    const { employees, setEmployees, addEmployees } = useContext(AuthContext);
    console.log(params.updateId);

    const idRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const designationRef = useRef();
    const phoneRef = useRef();

    const selectedEmployee = employees.find(employee => employee.id === params.updateId);
    const restEmployees = employees.filter(employee => employee.id !== params.updateId);
    const { name, id, email, phone, designation } = selectedEmployee;
    console.log(selectedEmployee);



    useEffect(() => {
        idRef.current.value = id;
        nameRef.current.value = name;
        emailRef.current.value = email;
        designationRef.current.value = designation;
        phoneRef.current.value = phone;
    }, []);


    const handleUpdateEmployee = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const employeeId = form.employeeId.value;
        const email = form.email.value;
        const designation = form.designation.value;
        const phone = form.phone.value;

        const employeeDetails = {
            id: employeeId,
            name: name,
            email: email,
            designation: designation,
            phone: phone
        };


        console.log('restEmployees ', restEmployees);
        console.log('current Employee ', employeeDetails);
        const mergedArray = [...restEmployees, employeeDetails];
        setEmployees(mergedArray);
        console.log('Updated ALl Employees ', mergedArray);

        addEmployees(mergedArray);

        form.reset();

        router.push('/');
    }

    return <div className='container'>
        <div className='fw-bold my-4'><Link href='/' className='bg-primary text-white text-decoration-none px-4 py-2 rounded' ><IoMdArrowBack className='me-2' />Back To Home</Link></div>
        <form onSubmit={handleUpdateEmployee} className='employeeForm row'>
            <div className='col'>
                <label for="exampleFormControlInput1">Employee Id</label>
                <input type="text" name='employeeId' ref={idRef} className="form-control" id="exampleFormControlInput1" /><br />
                <label for="exampleFormControlInput1">Email</label>
                <input type="email" className='form-control' ref={emailRef} name='email' placeholder='Enter Email' /><br />
                <label htmlFor="phone">Phone</label>
                <input type="text" className='form-control' ref={phoneRef} name='phone' placeholder='Enter phone' /><br />

            </div>
            <div className='col'>
                <label for="exampleFormControlInput1">Name</label>
                <input type="text" name='name' ref={nameRef} placeholder='Enter Name' className="form-control" id="exampleFormControlInput1" /><br />
                <label htmlFor="designation">Designation</label>
                <input type="text" className='form-control' ref={designationRef} name='designation' placeholder='Enter designation' /><br />
            </div>

            <input type="submit" className='bg-warning fw-bold' value='Update Employee' />
        </form>
    </div>
}