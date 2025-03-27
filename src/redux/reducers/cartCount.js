import { createSlice } from "@reduxjs/toolkit";


const cartReducer = createSlice({
    name: "cart",
    initialState: 0,
    reducers: {
        setCountCart: (state , action)=>{
            state=action.payload;
            return state
        },
        increment: (state , action)=>{
            state+=1;
            return state
        },
        decrement: (state , action)=>{
            state-=1;
            return state
        },
    }
})

export const {increment , decrement , setCountCart} = cartReducer.actions;
export default cartReducer.reducer;
