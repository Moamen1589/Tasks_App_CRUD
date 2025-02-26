import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../Slices/Tasks";

export default function TaskDetails() {
    const { task } = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!task) {
        return <p className="text-center text-gray-500">Task not found.</p>;
    }

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        navigate("/");
    };

    const handleEdit = () => {
        navigate("/taskupdate", { state: { 'task': task } });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            {task.image && (
                <img src={task.image} alt={task.title} className="w-full h-40 object-cover rounded-md" />
            )}
            <h2 className="text-2xl font-bold mt-4">{task.title}</h2>
            <p className="text-gray-600 my-5">Description: {task.description}</p>

            <p className="my-7 font-medium">
                <span className="text-gray-700">Priority:</span>
                <span className={`ml-2 px-2 py-1 rounded text-white font-semibold ${task.priority === 'Low' ? 'bg-sky-400' :
                    task.priority === 'Medium' ? 'bg-amber-400' :
                        task.priority === 'High' ? 'bg-red-600' :
                            'bg-gray-300'
                    }`}>
                    {task.priority}
                </span>
            </p>

            <p className="font-medium my-7">
                <span className="text-gray-700">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-white font-semibold ${task.state === 'todo' ? 'bg-red-500' :
                    task.state === 'doing' ? 'bg-amber-400' :
                        task.state === 'done' ? 'bg-green-600' :
                            'bg-gray-300'
                    }`}>
                    {task.state}
                </span>
            </p>

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
