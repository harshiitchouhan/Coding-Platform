import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "Utils/axiosClient";

export const registeredUser = createAsyncThunk(
    "auth/register",
    async(userData,{rejectWithValue})=>{
        try{

            const response = await axios.post("/user/register" , userData);
            return response.data.user;

            // response kuch aisa hota hai
            // response = {
            //     data:{     // data kuch aisa hai jo humne banaya h backend mei
            //         user:Reply,
            //         message:Register Sucess
            //     }
            //     status_code:
            // }

        }
        catch(err){
            return rejectWithValue(err);
        }
    }

)

export const loginUser = createAsyncThunk(
    "auth/login",
    async(credentials ,{rejectWithValue})=>{
        try{
            const response = await axios.post("/user/login" , credentials);
            return response.data.user;
        }
        catch(err){
            return rejectWithValue(err);
        }
    }
)

export const authCheck = createAsyncThunk(
    "auth/check",
    async( _ , {rejectWithValue})=>{
        try{
            const {data} = await axios.get("/user/check");
            return data.user;

        }
        catch(err){
            return rejectWithValue(err);
        }
    }
)

export const logOut = createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue})=>{
        try{
            await axios.post("/user/logout")
            return null;
        }
        catch(err){
            return rejectWithValue(err);
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState : {
        user : null,
        isAuthenticated : false,
        loading : false,
        error : null
    },
    reducers:{},
    extraReducers : (builder)=>{
        builder
        // pending ?? Registered USer
        .addCase(registeredUser.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        //fulfilled
        .addCase(registeredUser.fulfilled , (state,action)=>{
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = !!action.payload
        })

        //rejected
        .addCase(registeredUser.rejected , (state)=>{
            state.error = state.payload?.message || "Some Error Occured";
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        })


        //Login User
        //pending
        .addCase(loginUser.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        //fulfilled
        .addCase(loginUser.fulfilled , (state,action)=>{
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = !!action.payload
        })

        //rejected
        .addCase(loginUser.rejected , (state)=>{
            state.error = state.payload?.message || "Some Error Occured";
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;

        })

        //authCheck
        //Pending
            .addCase(authCheck.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        //fulfilled
        .addCase(authCheck.fulfilled , (state,action)=>{
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = !!action.payload
        })

        //rejected
        .addCase(authCheck.rejected , (state)=>{
            state.error = state.payload?.message || "Some Error Occured";
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        })

        //Logout
            .addCase(logOut.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        //fulfilled
        .addCase(logOut.fulfilled , (state,action)=>{
            state.user = null;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = null;
        })

        //rejected
        .addCase(logOut.rejected , (state)=>{
            state.error = state.payload?.message || "Some Error Occured";
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        })
    }
        
})

export default authSlice.slicers; 