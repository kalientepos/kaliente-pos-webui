import { createSlice, current } from "@reduxjs/toolkit";
import authThunkBuilder from "./auth-thunk";

const initialState = { email: '', token: '', role: ''}

const authSlice = createSlice({
    name: 'Auth', 
    initialState,
    reducers: {
        register(state, action) {
            state.token = action.payload.token
        },
        login(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.role = action.payload.role
        },
        logout(state) {
            state.token = '';
            state.email = '';
            state.role = '';
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => authThunkBuilder(builder),
});
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;