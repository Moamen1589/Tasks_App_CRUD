import { createSlice } from '@reduxjs/toolkit';

let currentId = 1;
const numericId = () => ++currentId;

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        allTasks: [],
        filteredTasks: [],
        filters: { title: "", priority: "", taskState: "" }
    },
    reducers: {
        addTask: (state, action) => {
            const task = { id: state.allTasks.length === 0 ? 1 : numericId(), ...action.payload };
            return {
                ...state,
                allTasks: [...state.allTasks, task]
            };
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            return {
                ...state,
                allTasks: state.allTasks.map((task) =>
                    task.id === id ? { ...task, ...updatedTask } : task
                )
            };
        },
        deleteTask: (state, action) => {
            state.allTasks = state.allTasks.filter((task) => task.id !== action.payload);
            state.filteredTasks = state.filteredTasks.filter((task) => task.id !== action.payload);
        },
        changeTaskState: (state, action) => {
            const { id, newState } = action.payload;
            return {
                ...state,
                allTasks: state.allTasks.map((task) =>
                    task.id === id ? { ...task, state: newState } : task
                )
            };
        },
        searchFilter: (state, action) => {
            const { title, priority, taskState } = action.payload;

            state.filteredTasks = state.allTasks.filter((task) => {
                const matchesTitle = title ? task.title.toLowerCase().includes(title.toLowerCase()) : true;
                const matchesPriority = priority ? task.priority === priority : true;
                const matchesState = taskState ? task.state === taskState : true;
                return matchesTitle && matchesPriority && matchesState;
            });
        },

        // Reset filtered tasks 
        clearFilters: (state) => {
            state.filteredTasks = [...state.allTasks];
        }


    },
});

export const { addTask, updateTask, deleteTask, changeTaskState, searchFilter, clearFilters } = tasksSlice.actions;
export default tasksSlice.reducer;
