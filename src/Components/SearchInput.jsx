import { useDispatch } from "react-redux";
import { searchFilter, clearFilters } from "../Slices/Tasks";
import { useState } from "react";

export default function SearchInput() {
    const dispatch = useDispatch();

    
    const [filters, setFilters] = useState({ title: "", priority: "", taskState: "" });

   
    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        dispatch(searchFilter(newFilters)); 
    };

    
    const handleInputChange = (e) => {
        applyFilters({ ...filters, title: e.target.value });
    };

   
    const handleFilterClick = (key, value) => {
        applyFilters({ ...filters, [key]: filters[key] === value ? "" : value });
    };

   
    const clearAllFilters = () => {
        setFilters({ title: "", priority: "", taskState: "" });
        dispatch(clearFilters()); 
    };

    return (
        <div className="flex flex-col sm:flex-row  justify-center gap-4 items-center p-4">
            <input
                type="text"
                placeholder="Search Tasks"
                value={filters.title}
                onChange={handleInputChange}
                className="border-2 block border-black py-1 px-3 rounded-md"
            />

            <div className="flex gap-2">
                {["Low", "Medium", "High"].map((priority) => (
                    <button
                        key={priority}
                        onClick={() => handleFilterClick("priority", priority)}
                        className={`py-1 px-3 rounded-md text-white font-semibold transition ${
                            filters.priority === priority ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    >
                        {priority}
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                {["todo", "doing", "done"].map((taskState) => (
                    <button
                        key={taskState}
                        onClick={() => handleFilterClick("taskState", taskState)}
                        className={`py-1 px-3 rounded-md text-white font-semibold transition ${
                            filters.taskState === taskState ? "bg-green-600" : "bg-gray-400"
                        }`}
                    >
                        {taskState.toUpperCase()}
                    </button>
                ))}
            </div>

            <button
                onClick={clearAllFilters}
                className="bg-red-500 text-white py-1 px-4 rounded-md transition hover:bg-red-700"
            >
                Clear Filters
            </button>
        </div>
    );
}
