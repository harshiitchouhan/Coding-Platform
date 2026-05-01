import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/authSlice"
import problemReducer from "./Features/problem/problemSlice"

const stores = configureStore({
    reducer:{
        auth : authReducer,
        problems : problemReducer,
    }
})


export default stores;