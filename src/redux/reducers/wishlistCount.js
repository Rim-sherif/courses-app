import { createSlice } from "@reduxjs/toolkit";


const wishlistReducer = createSlice({
    name: "wishlist",
    initialState: 0,
    reducers: {
        setCount: (state , action)=>{
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

export const {increment , decrement , setCount} = wishlistReducer.actions;
export default wishlistReducer.reducer;
