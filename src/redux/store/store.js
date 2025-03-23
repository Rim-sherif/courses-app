import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../reducers/searchSlice";
import tokenSlice from "../reducers/tokenSlice";
import userReducer from "../reducers/userSlice";

export const store = configureStore({
    reducer:{
        token: tokenSlice,
        search: searchSlice,
        user: userReducer
    }
})