import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "userToken",
  initialState: { 
    loggedIn: !!localStorage.getItem("genToken"),
    role: null 
  },
  reducers:{
    getToken: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = null;
      localStorage.removeItem("genToken");
    }
  }
})

export const { getToken, logout } = tokenSlice.actions;
export default tokenSlice.reducer;
