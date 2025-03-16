import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const tokenSlice = createSlice({
    name: "userToken",
    initialState: "",
    reducers:{
        // getToken: (state, action)=>{
        //     if(Cookies.get("token") != undefined){
        //         state = Cookies.get("token");
        //         return state
        //     }else{
        //         state = false;
        //     }
        // }
    }
})

export const {getToken} = tokenSlice.actions;

export default tokenSlice.reducer;