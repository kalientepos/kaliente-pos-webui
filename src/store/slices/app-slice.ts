import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appTitle: 'Kaliente POS',
    activePageTitle: ''
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
    }
});

export default appSlice.reducer;