import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    mode: "light",
    user:null,
    token:null,
    posts:[],
};
//swtiching betweek dark and light mode
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        //light or dark mode
        setMode:(state)=>
        {
            state.mode = state.mode === "light" ? "dark" : 'light';
        },
        //login page state (pulleing specifc information)
        setLogin: (state,action)=>{
            state.user=action.payload.user;
            state.token = action.payload.token;

        },
        //logout page resetting user 
        setlogout: (state)=>{
            state.user = null;
            state.token = null;
        },
        //freindslist
        setFriends: (state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.error("user friends are non-existent")
            }
    },
    //getting posts 
    setPosts:(state, action)=>{
        state.posts = action.payload.posts;
    },
    setPost: (state, action)=>{
        const updatedPosts = state.posts.map((post)=>{
            if( post._id === action.payload.post_id )return action.payload.post;
            return post;
        });
        state.posts = updatedPosts;
    }
}

})

export const{setMode, setLogin, setLogout, setFriends,setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;