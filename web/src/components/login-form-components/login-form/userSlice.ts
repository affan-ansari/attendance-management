import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ILoginUserData } from "./login-form.types";

export interface CounterState {
    currentUser: ILoginUserData | null;
}

const initialState: CounterState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
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

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
