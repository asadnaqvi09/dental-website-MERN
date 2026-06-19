import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

const mergeAffected = (state, affected) => {
    if (!Array.isArray(affected) || affected.length === 0) return;
    const map = Object.fromEntries(affected.map((item) => [item._id, item]));
    state.data = state.data.map((item) => map[item._id] || item);
};

export const createAppointment = createAsyncThunk(
    'appointments/create',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post('/appointment/create-appointment', data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAll',
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
    'appointments/confirm',
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
    'appointments/reject',
    async ({ id, adminNote }, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/appointment/reject-appointment/${id}`, { adminNote });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reject appointment');
        }
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointments/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/appointment/delete-appointment/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete appointment');
        }
    }
);

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        data: [],
        loading: false,
        submitLoading: false,
        actionLoading: false,
        error: null,
        adminFilter: 'pending',
    },
    reducers: {
        clearAppointmentError: (state) => {
            state.error = null;
        },
        setAdminFilter: (state, action) => {
            state.adminFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.submitLoading = true;
            })
            .addCase(createAppointment.fulfilled, (state) => {
                state.submitLoading = false;
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.submitLoading = false;
                state.error = action.payload || 'Failed to create appointment';
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(confirmAppointment.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(confirmAppointment.fulfilled, (state, action) => {
                state.actionLoading = false;
                mergeAffected(state, action.payload.affected);
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
                mergeAffected(state, [action.payload]);
            })
            .addCase(rejectAppointment.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export const { clearAppointmentError, setAdminFilter } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
