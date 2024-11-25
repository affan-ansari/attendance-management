import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IAttendanceData } from "../user-dashboard-overview.types";
import { getMyAttendance } from "../user-dashboard-overview.service";

export interface CounterState {
    loading: boolean;
    data: IAttendanceData[];
}

const initialState: CounterState = {
    loading: false,
    data: [],
};

export const fetchMyAttendance = createAsyncThunk(
    "attendance/fetchMyAttendance",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getMyAttendance();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        // getAttendanceData: (state) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyAttendance.pending, (state) => {
                state.data = [];
                state.loading = true;
            })
            .addCase(fetchMyAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMyAttendance.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectMyAttendance = (state: RootState) => state.attendance.data;
export const selectAttendanceLoading = (state: RootState) => state.attendance.loading;

export default attendanceSlice.reducer;
