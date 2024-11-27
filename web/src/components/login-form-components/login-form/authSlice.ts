import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { AuthState } from "./login-form.types";

const initialState: AuthState = {
    currentUser: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
