import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import attendanceSlice from "../components/user-dashboard-overview/attendance-table/attendanceSlice";
import userSlice from "../components/login-form-components/login-form/userSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        attendance: attendanceSlice,
        user: userSlice,
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
