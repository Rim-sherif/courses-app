import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../reducers/searchSlice";
import tokenSlice from "../reducers/tokenSlice";
import userReducer from "../reducers/userSlice";
import wishlistReducer from "../reducers/wishlistCount";
import cartReducer from "../reducers/cartCount";

export const store = configureStore({
    reducer:{
        token: tokenSlice,
        search: searchSlice,
        user: userReducer,
        wishlistCount: wishlistReducer,
        cartCount: cartReducer
    }
})