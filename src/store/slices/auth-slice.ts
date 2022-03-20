import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: '', token: '' }

const authSlice = createSlice({
    name: 'Auth', 
    initialState,
    reducers: {
        register(state, action) {
            state.token = action.payload['token']
        },
        login(state, action) {
            state.token = action.payload['token']
        },
        logout(state, action) {
            state.token = '';
        }
    }
});
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;