import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const fetchAdminAppointments = createAsyncThunk(
    'adminAppointments/fetchAll',
    async (status, { rejectWithValue }) => {
        try {
            const params = status ? { status } : {};
            const res = await api.get('/appointment/get-appointment', { params });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
        }
    }
);

export const confirmAppointment = createAsyncThunk(
    'adminAppointments/confirm',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/appointment/confirm-appointment/${id}`);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to confirm appointment');
        }
    }
);

export const rejectAppointment = createAsyncThunk(
    'adminAppointments/reject',
    async ({ id, adminNote }, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/appointment/reject-appointment/${id}`, { adminNote });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reject appointment');
        }
    }
);

export const deleteAdminAppointment = createAsyncThunk(
    'adminAppointments/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/appointment/delete-appointment/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete appointment');
        }
    }
);

const adminAppointmentSlice = createSlice({
    name: 'adminAppointments',
    initialState: {
        data: [],
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        clearAdminAppointmentError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdminAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(confirmAppointment.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(confirmAppointment.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data = state.data.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(confirmAppointment.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(rejectAppointment.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(rejectAppointment.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data = state.data.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(rejectAppointment.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteAdminAppointment.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export const { clearAdminAppointmentError } = adminAppointmentSlice.actions;
export default adminAppointmentSlice.reducer;
