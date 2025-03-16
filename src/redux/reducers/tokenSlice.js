import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const tokenSlice = createSlice({
    name: "userToken",
    initialState: {loggedIn: localStorage.getItem("genToken")},
    reducers:{
        getToken: (state, action)=>{
            console.log(JSON.stringify(state));
            state.loggedIn = action.payload;
            return state;
        }
    }
})

export const {getToken} = tokenSlice.actions;

export default tokenSlice.reducer;