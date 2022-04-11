import { configureStore, Store } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./slices/auth/auth-slice";
import modalSlice from "./slices/modal-slice";

import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Hook HOC for store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;