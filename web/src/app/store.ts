import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "../components/admin-dashboard-overview/userSlice";
import authReducer from "../components/login-form-components/login-form/authSlice";
import attendanceReducer from "../components/user-dashboard-overview/attendance-table/attendanceSlice";
import availabilityTableSlice from "../components/admin-dashboard-overview/availability-tables/availabilityTablesSlice";

export const store = configureStore({
    reducer: {
        attendance: attendanceReducer,
        availabilityTables: availabilityTableSlice,
        auth: authReducer,
        user: userReducer,
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
