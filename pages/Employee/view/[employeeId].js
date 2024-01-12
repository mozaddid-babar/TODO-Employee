import Link from "next/link";
import { useParams } from 'next/navigation'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/router";


export default function EmployeeDetails() {
    const params = useParams()
    const { employees, setEmployees } = useContext(AuthContext);

    const router = useRouter();

    const selectedEmployee = employees.find(employee => employee.id === params.employeeId);
    const { name, id, email, phone, designation } = selectedEmployee;

    const handleUpdateEmployee = id => {
        router.push(`/Employee/update/${id}`);
    }
    // console.log(selectedEmployee);
    return <div>
        <div class="container">
            <div className="row">
                <div className="col">

                    <div className='fw-bold my-4'><Link href='/' className='bg-primary text-white text-decoration-none px-4 py-2 rounded' ><FaArrowLeftLong className='me-2' />Back To Home</Link></div>
                </div>
                <div className="col text-end">
                    <div className='fw-bold my-4'><button onClick={() => handleUpdateEmployee(id)} className='bg-primary border-0 text-white text-decoration-none px-4 py-2 rounded'>Update Employee<FaArrowRightLong className='ms-2' /></button></div>
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <p className=" border-bottom p-1"><span className="fw-bold ">Employee ID:</span> {id}</p>
                    <p className="  border-bottom p-1"><span className="fw-bold">Email:</span> {email}</p>
                    <p className="  border-bottom p-1"><span className="fw-bold">Phone:</span> {phone}</p>
                </div>
                <div class="col">
                    <p className="  border-bottom p-1"><span className="fw-bold">Name:</span> {name}</p>
                    <p className="  border-bottom p-1"><span className="fw-bold">Designation:</span> {designation}</p>
                </div>
            </div>
        </div>
    </div>;
}