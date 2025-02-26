import { configureStore } from "@reduxjs/toolkit";
import Tasks from '../Slices/Tasks'
export const store = configureStore({
    reducer: {
        tasks: Tasks
    }
})