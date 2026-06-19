import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const fetchServices = createAsyncThunk(
    'services/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/services');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
        }
    }
);

export const createService = createAsyncThunk(
    'services/create',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/service', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create service');
        }
    }
);

export const updateService = createAsyncThunk(
    'services/update',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/service/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update service');
        }
    }
);

export const deleteService = createAsyncThunk(
    'services/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/service/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete service');
        }
    }
);

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        data: [],
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createService.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createService.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(updateService.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data = state.data.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(updateService.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export default servicesSlice.reducer;
