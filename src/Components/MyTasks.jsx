import { useSelector, useDispatch } from "react-redux";
import { deleteTask, searchFilter } from "../Slices/Tasks";
import { Link, useNavigate } from "react-router-dom";
import img from '../assets/Images/no-task.jpg'
import SearchInput from "./SearchInput";
import { useEffect } from "react";
import Swal from "sweetalert2";
export default function MyTasks() {
    const tasks = useSelector(state => state.tasks.filteredTasks.length !== 0 ? state.tasks.filteredTasks : state.tasks.allTasks)
    const { filters } = useSelector(state => state.tasks)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const headInfo = [
        { info: 'Id', id: 1 },
        { info: 'Image', id: 2 },
        { info: 'Title', id: 3 },
        { info: 'Description', id: 4 },
        { info: 'Priority', id: 5 },
        { info: 'State', id: 6 },
        { info: 'Actions', id: 7 },

    ]

    const handleView = (viewTask) => {
        navigate('/taskdetails', { state: { 'task': viewTask } })
    }


    const handleUpdate = (taskUpdate) => {
        navigate('/taskupdate', { state: { 'task': taskUpdate } })
    };


    const handleStateChange = (taskUpdate) => {
        navigate('/changestate', { state: { 'task': taskUpdate } })
    };

    const handelDelete = (id) => {
        Swal.fire({
            title: 'Are You Sure ?',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        }).then((confirm) => {
            if (confirm.isConfirmed) {
                dispatch(deleteTask(id))
            }
        })
    }

    // rerender component dependand on filters to remove any filter
    useEffect(() => {
        dispatch(searchFilter(filters));
    }, [filters]);


    return (

        <>
            <h1 className="text-center font-bold text-4xl my-5">My Tasks</h1>
            <SearchInput />
            <div className="p-4 ">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            {headInfo.map((headName) => (
                                <th key={headName.id} className="py-2 px-4 text-center">{headName.info}</th>
                            ))
                            }

                        </tr>

                    </thead>
                    <tbody>
                        {tasks.length !== 0 ? (
                            tasks.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-2 px-4 text-center">{user.id}</td>
                                    <td className="py-2 px-4 text-center flex justify-center items-center">
                                        <img className="w-36" src={user.image} alt="Task" />
                                    </td>
                                    <td className="py-2 px-4 text-center">{user.title}</td>
                                    <td className="py-2 px-4 text-center">{user.description}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className={`px-2 py-1 rounded text-white font-semibold ${user.priority === 'Low' ? 'bg-sky-400' :
                                            user.priority === 'Medium' ? 'bg-amber-400' :
                                                user.priority === 'High' ? 'bg-red-600' :
                                                    'bg-gray-300'
                                            }`}>
                                            {user.priority}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <span className={`px-2 py-1 rounded text-white font-semibold ${user.state === 'todo' ? 'bg-red-500' :
                                            user.state === 'doing' ? 'bg-amber-400' :
                                                user.state === 'done' ? 'bg-green-600' :
                                                    'bg-gray-300'
                                            }`}>
                                            {user.state}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="h-full flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleStateChange(user)}
                                                className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded cursor-pointer"
                                            >
                                                Change State
                                            </button>
                                            <button
                                                onClick={() => handleView(user)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(user)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handelDelete(user.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    <img src={img} alt="No Tasks Found" className="w-96 mx-auto" />
                                    <p className="text-gray-500 mt-2">No tasks found. Add one to get started!</p>
                                    <Link className=" w-42 block bg-sky-500 py-2 text-white mx-auto mt-5 rounded-md" to={'/taskform'}>Add Task</Link>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div >
        </>
    );
}
