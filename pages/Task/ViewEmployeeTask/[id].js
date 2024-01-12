import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import MenuItem from "../../components/MenuItem/MenuItem";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import AddTask from "../AddTask";

export default function ViewEmployeeTask({ selectedEmployee }) {
    const params = useParams();
    const router = useRouter();
    const { id } = router.query;
    const [completedTasks, setCompletedTasks] = useState([]);
    const { employees, setEmployees, addEmployees, taskFormCompleted, taskCompleted, setTaskCompleted, setCanTaskUpdate, canTaskUpdate } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [updatedTaskInfo, setUpdatedTaskInfo] = useState({ taskID: null, taskName: '', deadline: '' });


    console.log('seletectedEmployee id from tasklist type ', typeof (id));
    const oldEmployee = employees.find(employee => employee.id === Number(id)) || employees.find(employee => employee.name === selectedEmployee);
    // console.log('taskFormCompleted  ', taskFormCompleted);
    console.log('oldEmploee tasks ', oldEmployee?.tasks);

    const handleCompletedTask = (taskID) => {

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === oldEmployee.id) {
                for (let j = 0; j < employees[i].tasks.length; j++) {
                    if (employees[i].tasks[j].taskId === taskID) {
                        employees[i].tasks[j].isCompleted = !(employees[i].tasks[j].isCompleted);
                        setTaskCompleted(employees[i].tasks[j].isCompleted);
                        console.log('New Updated tasks status ', taskCompleted);
                    }
                }
                break;
            }
        }

        // Update state and localStorage
        setEmployees([...employees]);
        console.log(employees);
        // localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const handleTaskUpdate = (taskID) => {
        setEditMode(true);

        // Find the task to update and set the initial values
        const selectedTask = oldEmployee?.tasks.find(task => task.taskId === taskID);
        setUpdatedTaskInfo({
            taskID: taskID,
            taskName: selectedTask?.taskName || '',
            deadline: selectedTask?.deadline || ''
        });
    }

    const handleUpdateTask = (taskID) => {
        // Find the index of the task to update
        const taskIndex = oldEmployee?.tasks.findIndex(task => task.taskId === taskID);

        // Create a copy of the tasks array to avoid mutating the state directly
        const updatedTasks = [...oldEmployee?.tasks];

        // Update the task details
        updatedTasks[taskIndex].taskName = updatedTaskInfo.taskName;
        updatedTasks[taskIndex].deadline = updatedTaskInfo.deadline;

        // Disable edit mode
        setEditMode(false);

        // Update state and localStorage
        setEmployees([...employees]);
        console.log('After Updating task ', employees);

        // Show success message
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
        });
    }


    const handleDeleteTask = (taskID) => {
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
                const filteredEmployeeTasks = oldEmployee?.tasks?.filter(task => task.taskId !== taskID);

                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].id === oldEmployee.id) {
                        employees[i].tasks = filteredEmployeeTasks;
                    }
                }

                // Use setTimeout to give some time for state to update
                setTimeout(() => {
                    setEmployees([...employees]);
                    addEmployees([...employees]);

                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }, 0);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    };

    useEffect(() => {
        // Move localStorage.setItem here to make sure it's called after state update
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);



    // console.log('Tasklist employees ', employees);
    return <div>
        <div className="container my-3">
            {
                taskFormCompleted &&
                <MenuItem />
            }
            <p className="fs-4"><span className="fw-bold">Employee Name:</span> {oldEmployee?.name}</p>
            <ul>
                {oldEmployee?.tasks ?
                    oldEmployee?.tasks.map((task) => (
                        <li
                            key={task.taskId}
                            className="my-2"

                        >
                            <span className="me-2">
                                <span className="fw-bold">TaskName:</span> {editMode && updatedTaskInfo.taskID === task.taskId ? (
                                    <input
                                        type="text"
                                        value={updatedTaskInfo.taskName}
                                        onChange={(e) => setUpdatedTaskInfo({ ...updatedTaskInfo, taskName: e.target.value })}
                                    />
                                ) : (
                                    <label>{task?.taskName}</label>
                                )}
                            </span>
                            <span>
                                <span className="fw-bold">Deadline:</span> {editMode && updatedTaskInfo.taskID === task.taskId ? (
                                    <input
                                        type="date"
                                        value={updatedTaskInfo.deadline}
                                        onChange={(e) => setUpdatedTaskInfo({ ...updatedTaskInfo, deadline: e.target.value })}
                                    />
                                ) : (
                                    <label>{task?.deadline}</label>
                                )}
                            </span>
                            {!task.isCompleted ?
                                <button className={`mx-1 border-1`} onClick={() => handleCompletedTask(task.taskId)}>Completed?</button> : <button disabled className={`mx-1 border-1 bg-success`}>Done</button>
                            }
                            {editMode ? (
                                <button className="mx-1 border-1" onClick={() => handleUpdateTask(task.taskId)}>
                                    Update
                                </button>
                            ) : (
                                <button className="mx-1 border-1" onClick={() => handleTaskUpdate(task.taskId)}>
                                    Edit
                                </button>
                            )}
                            <button className="mx-1 border-1" onClick={() => handleDeleteTask(task.taskId)}>Delete</button>
                        </li>
                    ))
                    : <div>
                        <p>{'No tasks available'}</p>
                        <AddTask selectedEmployee={selectedEmployee} />
                    </div>
                }
            </ul>
            {
                oldEmployee?.tasks ? <AddTask selectedEmployee={selectedEmployee} /> : ''
            }
            {/* <button onClick={() => router.push(`/Task/AddTask`)} className='mb-2 text-decoration-none'>Add Task</button> */}
        </div>
    </div>
}
