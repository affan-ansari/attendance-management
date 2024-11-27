import { RootState } from "../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, getUsers } from "./admin-dashboard-overview.service";
import { IAttendanceUser, IUserData } from "./admin-dashboard-overview.types";

export interface UserState {
    loading: boolean;
    data: IUserData[];
    user: IAttendanceUser | undefined | null;
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    data: [],
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const data = await getUsers();
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUser = createAsyncThunk<IAttendanceUser, string, { rejectValue: string }>(
    "user/fetchUser",
    async (userId, { rejectWithValue }) => {
        try {
            const data = await getUser(userId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.data = [];
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(fetchUser.pending, (state) => {
                state.user = null;
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectUsers = (state: RootState) => state.user.data;
export const selectUser = (state: RootState) => state.user.user;
export const selectUsersLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
