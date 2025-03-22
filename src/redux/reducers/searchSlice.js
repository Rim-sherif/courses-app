import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getData = createAsyncThunk("search/getData" , async (values , thunkApi)=>{
    try {

        const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/search`,values);
        console.log(data);
        
        return data
        
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
})

const searchSlice = createSlice({
    name: "search",
    initialState: {error: false , loading: true , data: []},
    extraReducers: (builder)=>{
        builder.addCase(getData.pending , (state , action)=>{
            state.error = false;
            state.loading = true
        }).addCase(getData.fulfilled , (state , action)=>{
            state.data = action.payload;
            state.error = false,
            state.loading = true;
        }).addCase(getData.rejected , (state , action)=>{
            state.error = true,
            state.loading = false;
        })
    }
});

export default searchSlice.reducer;