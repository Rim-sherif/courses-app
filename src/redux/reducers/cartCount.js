import { createSlice } from "@reduxjs/toolkit";


const cartReducer = createSlice({
    name: "cart",
    initialState: 0,
    reducers: {
        setCountCart: (state , action)=>{
            state=action.payload;
            return state
        },
        cartIncrement: (state , action)=>{
            state+=1;
            return state
        },
        cartDecrement: (state , action)=>{
            state-=1;
            return state
        },
    }
})

export const {cartIncrement , cartDecrement , setCountCart} = cartReducer.actions;
export default cartReducer.reducer;
