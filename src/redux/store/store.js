import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../reducers/tokenSlice";
import searchSlice from "../reducers/searchSlice";

export const store = configureStore({
    reducer:{
        token: tokenSlice,
        search: searchSlice
    }
})