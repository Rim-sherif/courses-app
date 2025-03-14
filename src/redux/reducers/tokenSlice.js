import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const tokenSlice = createSlice({
    name: "userToken",
    initialState: "",
    reducers:{
        getToken: (state, action)=>{
            state = Cookies.get("token");
            return state
        }
    }
})

export const {getToken} = tokenSlice.actions;

export default tokenSlice.reducer;