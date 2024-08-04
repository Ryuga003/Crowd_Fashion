import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    username: "",
    email: "",
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
            }
        }
    }
})

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;