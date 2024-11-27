import { RootState } from "../../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttendanceByStatus } from "../admin-dashboard-overview.service";
import { IAttendanceByStatusData } from "./availability-table-card/availability-table-card.types";

export interface AvailabilityTablesState {
    loadingPresent: boolean;
    loadingAbsent: boolean;
    loadingOnLeave: boolean;
    presentData: IAttendanceByStatusData[];
    absentData: IAttendanceByStatusData[];
    onLeaveData: IAttendanceByStatusData[];
}

const initialState: AvailabilityTablesState = {
    loadingPresent: false,
    loadingAbsent: false,
    loadingOnLeave: false,
    presentData: [],
    absentData: [],
    onLeaveData: [],
};

export const fetchAttendanceByStatus = createAsyncThunk<
    IAttendanceByStatusData[],
    string,
    { rejectValue: string }
>("attendance/fetchAttendanceByStatus", async (status, { rejectWithValue }) => {
    try {
        const data = await getAttendanceByStatus(status);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const availabilityTableSlice = createSlice({
    name: "availabilityTable",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceByStatus.pending, (state, action) => {
                const status = action.meta.arg;
                if (status === "present") {
                    state.loadingPresent = true;
                    state.presentData = [];
                } else if (status === "absent") {
                    state.loadingAbsent = true;
                    state.absentData = [];
                } else if (status === "leave") {
                    state.loadingOnLeave = true;
                    state.onLeaveData = [];
                }
            })
            .addCase(fetchAttendanceByStatus.fulfilled, (state, action) => {
                const status = action.meta.arg;
                if (status === "present") {
                    state.loadingPresent = false;
                    state.presentData = action.payload;
                } else if (status === "absent") {
                    state.loadingAbsent = false;
                    state.absentData = action.payload;
                } else if (status === "leave") {
                    state.loadingOnLeave = false;
                    state.onLeaveData = action.payload;
                }
            })
            .addCase(fetchAttendanceByStatus.rejected, (state, action) => {
                const status = action.meta.arg;
                if (status === "present") {
                    state.loadingPresent = false;
                    state.presentData = [];
                } else if (status === "absent") {
                    state.loadingAbsent = false;
                    state.absentData = [];
                } else if (status === "leave") {
                    state.loadingOnLeave = false;
                    state.onLeaveData = [];
                }
            });
    },
});

export const selectPresentData = (state: RootState) => state.availabilityTables.presentData;
export const selectPresentLoading = (state: RootState) => state.availabilityTables.loadingPresent;

export const selectAbsentData = (state: RootState) => state.availabilityTables.absentData;
export const selectAbsentLoading = (state: RootState) => state.availabilityTables.loadingAbsent;

export const selectOnLeaveData = (state: RootState) => state.availabilityTables.onLeaveData;
export const selectOnLeaveLoading = (state: RootState) => state.availabilityTables.loadingOnLeave;

export default availabilityTableSlice.reducer;
