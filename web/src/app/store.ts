import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../components/login-form-components/login-form/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
