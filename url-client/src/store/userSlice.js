import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    email:"",
    username:"",
    password:"",
    fullName:""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.username
            state.password = action.payload.password
            state.fullName = action.payload.fullName
        }
    }
})

export const {userDetails} = userSlice.actions

export default userSlice.reducer