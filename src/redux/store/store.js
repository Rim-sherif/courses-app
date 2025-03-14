import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../reducers/tokenSlice";

export const store = configureStore({
    reducer:{
        token: tokenSlice
    }
})