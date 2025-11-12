import { createSlice } from '@reduxjs/toolkit'
const initialState = {
user:{}
}

const UserSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
     setUserAction :(state,data)=>
    {
        state.user = data.payload
    }
  }
});

export const {setUserAction} = UserSlice.actions

export default UserSlice.reducer