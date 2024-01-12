import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { AuthContext } from '../context/AuthProvider';
import DropdownEmployeeSelection from './DropdownEmployeeSelection/DropdownEmployeeSelection';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ViewEmployeeTask from './ViewEmployeeTask/[id]';

const AddTask = ({ selectedEmployee }) => {
    // const [selectedEmployee, setSelectedEmployee] = useState('Select Employee');
    const { employees, setEmployees, taskFormCompleted, setTaskFormCompleted, addEmployees } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    const [taskId, setTaskId] = useState(() => {
        // Find the highest existing task ID or start from 1 if no tasks exist
        const highestTaskId = employees.reduce((maxId, employee) => {
            if (employee.tasks) {
                const employeeMaxId = Math.max(...employee.tasks.map(task => task.taskId), maxId);
                return employeeMaxId > maxId ? employeeMaxId : maxId;
            }
            return maxId;
        }, 0);
        return highestTaskId + 1;
    });

    // console.log(employees);


    // const chosenEmployee = employees.find(employee => employee.name === selectedEmployee);

    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const deadline = form.deadline.value;


        if (taskName && deadline) {
            const newTask = {
                taskId,
                taskName,
                deadline,
                isCompleted: false,
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setTaskId(taskId + 1);
            alert('New task added successfully');
            form.reset();
        }
    };

    const handleCompleteForm = () => {
        // Add the tasks to the selected employee's 'tasks' property
        let chosenEmployee;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].name === selectedEmployee) {
                chosenEmployee = employees[i];;
                console.log('Selected Employee ', selectedEmployee);
                console.log('Chosen Employee ', chosenEmployee);
                employees[i].tasks = employees[i].tasks || [];
                employees[i].tasks.push(...tasks);
                break;
            }
        }



        // Update employees and local storage
        setEmployees([...employees]);
        // localStorage.setItem('employees', JSON.stringify(employees));
        addEmployees(employees);

        // Show success message
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tasks Added Successfully',
            showConfirmButton: false,
            timer: 1500,
        });

        // Reset state
        setTasks([]);
        setTaskFormCompleted(true);
        router.push(`/Task/ViewEmployeeTask/${chosenEmployee?.id}`, undefined, { replace: true });
        // setTaskId(1);
    };

    // console.log('Employees from AddTask ', employees);
    // localStorage.clear();
    // localStorage.setItem('employees', JSON.stringify(employees));


    return (
        <div className='container'>
            {/* <div className='fw-bold my-4'><Link href='/' className='bg-primary text-white text-decoration-none px-4 py-2 rounded' ><IoMdArrowBack className='me-2' />Back To Home</Link></div> */}

            <div className="dropdown my-4">


                {
                    selectedEmployee != 'Select Employee' ?
                        <div>
                            {
                                !taskFormCompleted && <form onSubmit={handleAddTask}>
                                    {/* <p>first block executed</p> */}
                                    <input type="text" placeholder="Enter Task name" className="me-2" name="taskName" />
                                    <input type="date" placeholder="Enter Deadline" className="me-2" name="deadline" />
                                    <button type="submit" className='my-2'>Add Task</button>
                                </form>
                            }

                            {tasks.length > 0 && (
                                <div>
                                    <button onClick={handleCompleteForm}>Complete</button>
                                </div>
                            )}
                        </div> :
                        <div>
                            {
                                !taskFormCompleted && <form onSubmit={handleAddTask}>
                                    {/* <p>second block executed</p> */}
                                    <input type="text" disabled placeholder="Enter Task name" className="me-2" name="taskName" />
                                    <input type="date" disabled placeholder="Enter Deadline" className="me-2" name="deadline" />
                                    <button disabled type="submit" className='my-2'>Add Task</button>
                                </form>
                            }

                            {tasks.length > 0 && (
                                <div>
                                    <button onClick={handleCompleteForm}>Complete</button>
                                </div>
                            )}
                        </div>
                }
            </div>
        </div>
    );
};

export default AddTask;