import { configureStore } from "@reduxjs/toolkit";
import authReducer from "authSlice"

const stores = configureStore({
    reducer:{
        auth : authReducer,
    }
})


export default stores;