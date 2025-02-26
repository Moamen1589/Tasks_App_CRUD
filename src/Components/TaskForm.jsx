import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./YubSchema";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Slices/Tasks";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function TaskForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriorty] = useState();
    const [state, setState] = useState();
    const [image, setImagePreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = () => {
        const task = { title, description, priority, state, image };
        dispatch(addTask(task));
        Swal.fire({
            title: "Task Added Successfully",
            icon: "success"
        }).then((confirm) =>{
            if(confirm.isConfirmed){
                navigate('/')
            }
        })

    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-12">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Add Task</h2>

            {/* Task Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                    type="text"
                    placeholder="Enter task title"
                    {...register("taskTitle")}
                    className="mt-1 w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.taskTitle && <p className="text-red-500">{errors.taskTitle.message}</p>}
            </div>

            {/* Task Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Task Description</label>
                <textarea
                    rows={3}
                    placeholder="Enter task description"
                    {...register("description")}
                    className="mt-1 w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            {/* Priority Select Menu */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                    {...register("priority")}
                    className="mt-1 w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    onChange={(e) => setPriorty(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
            </div>

            {/* Status Select Menu */}
            <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                    {...register("status")}
                    className="mt-1 w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="todo">todo</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                </select>
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>

            {/* Image Upload with Preview */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <div className="mt-2 flex items-center gap-x-3">
                    {image ? (
                        <img
                            src={image}
                            alt="Preview"
                            className="w-20 h-20 rounded-md object-cover border"
                        />
                    ) : (
                        <PhotoIcon className="h-20 w-20 text-gray-300" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="mt-2 block w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 cursor-pointer px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
                Add Task
            </button>
        </form>
    );
}
