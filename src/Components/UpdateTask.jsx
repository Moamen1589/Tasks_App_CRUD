import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../Slices/Tasks";
import { useLocation,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Yup Schema
const schema = yup.object().shape({
    taskTitle: yup.string().required("Task title is required"),
    description: yup.string().required("Description is required"),
    priority: yup.string().required("Priority is required"),
    status: yup.string().required("Status is required"),
});

export default function UpdateTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { task } = useLocation().state;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriorty] = useState();
    const [imagePreview, setImagePreview] = useState(task.image || "");
    const fileInputRef = useRef(null);

    useEffect(() => {
        setValue("taskTitle", task.title);
        setValue("description", task.description);
        setValue("priority", task.priority);
        setValue("status", task.state);
    }, [task, setValue]);

    const onSubmit = () => {
        const updatedTask = {
            ...task,
            title: title ? title : task.title,
            description: description ? description : task.description,
            priority: priority ? priority : task.priority,
            image: imagePreview ? imagePreview : task.image
        };

        dispatch(updateTask({ id: task.id, 'updatedTask': updatedTask }));

           Swal.fire({
                    title: "Task Updated",
                    icon: "success"
                }).then((confirm) =>{
                    if(confirm.isConfirmed){
                        navigate('/')
                    }
                })
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-12">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Edit Task</h2>

            {/* Task Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                    type="text"
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
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
            </div>

            {/* Image Upload with Preview & Button */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <div className="mt-2 flex items-center gap-x-3">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 rounded-md object-cover border"
                        />
                    ) : (
                        <PhotoIcon className="h-20 w-20 text-gray-300" />
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                {/* Button to Open File Picker */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500"
                >
                    Choose Image
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 cursor-pointer px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
                Update Task
            </button>
        </form>
    );
}
