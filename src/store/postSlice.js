import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    list: [],
    loading: false,
    error: null,
}


const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPosts: (state,action) => {
            state.list = action.payload;
        },

        addPost: (state,action) => {
            state.list.push(action.payload);
        },

        removePost:(state,action) => {
            state.list = state.list.filter((p) => p.$id !== action.payload.$id);
        },

        updatePost: (state, action) => {
            const index = state.list.findIndex(post => post.$id === action.payload.$id);
            console.log("Index: ", index);
        
            if (index !== -1) {
                // Replace the old post with the updated one
                state.list[index] = action.payload;
            } else {
                console.warn("Post not found in list");
            }
        }
    }
});


export const {setPosts,addPost,removePost,updatePost} = postSlice.actions;

export default postSlice.reducer;