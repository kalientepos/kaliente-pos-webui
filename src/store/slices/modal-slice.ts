import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import authSlice from "./auth/auth-slice";

const initialState = {
    isVisible: false,
    message: ''
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action: PayloadAction<string>) {
            state.isVisible = true;
            state.message = action.payload;
        },
        hideModal(state) {
            state.isVisible = false;
        }
    }
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;