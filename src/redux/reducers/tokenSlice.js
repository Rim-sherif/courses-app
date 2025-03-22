import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "userToken",
    initialState: { loggedIn: null, role: null },
    reducers: {
        getToken: (state, action) => {
            state.loggedIn = action.payload.token;
            state.role = action.payload.role; 
            return state;
        },
        logout: (state) => {
            state.loggedIn = null;
            state.role = null;
            return state;
        }
    }
})

export const { getToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
