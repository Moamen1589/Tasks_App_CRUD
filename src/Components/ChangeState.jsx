import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask, changeTaskState } from "../Slices/Tasks";
import { useState } from "react";
import Swal from "sweetalert2";
export default function ChangeState() {
    const { task } = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState(task.state); // Track selected state

    if (!task) {
        return <p className="text-center text-gray-500">Task not found.</p>;
    }

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        navigate("/");
    };

    const handleEdit = () => {
        navigate("/taskupdate", { state: { task } });
    };

    const handleStateChange = (e) => {
        const newState = e.target.value;
        setSelectedState(newState);
        dispatch(changeTaskState({ id: task.id, newState })); 
               Swal.fire({
                    title: "State Has Changed",
                    icon: "success"
                });
        
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            {task.image && (
                <img src={task.image} alt={task.title} className="w-full h-40 object-cover rounded-md" />
            )}
            <h2 className="text-2xl font-bold mt-4">{task.title}</h2>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="mt-2 font-medium">
                <span className="text-gray-700">Priority:</span> {task.priority}
            </p>

            {/* 🔽 State Select Dropdown 🔽 */}
            <div className="mt-2 font-medium">
                <span className="text-gray-700">Status:</span>
                <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="ml-2 p-2 border rounded-md"
                >
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
