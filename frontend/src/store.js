import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"
import reducer from "./slices/UserSlice";
export const store = configureStore({
reducer:{
        user:userReducer
    }
}
)