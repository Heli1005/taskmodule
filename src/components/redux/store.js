import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import usersSlice from "./usersSlice";

export const store = configureStore(
    {
        reducer: {
            tasks: taskSlice,
            users:usersSlice
        }
    }
)

export default store;