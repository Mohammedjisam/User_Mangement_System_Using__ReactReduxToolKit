import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admin:JSON.parse(localStorage.getItem('adminkey')) || null
    },
    reducers:{
        addAdmin:(state,action)=>{
            state.admin = action.payload,
            localStorage.setItem('adminkey',JSON.stringify(action.payload))
        },
        logoutAdmin:(state)=>{
            state.admin=null;
            localStorage.removeItem('adminkey')
        }
    }
})

export const {addAdmin,logoutAdmin} = adminSlice.actions
export default adminSlice.reducer;