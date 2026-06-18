import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const fetchAdminServices = createAsyncThunk(
    'adminServices/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/services');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
        }
    }
);

export const createAdminService = createAsyncThunk(
    'adminServices/create',
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

export const updateAdminService = createAsyncThunk(
    'adminServices/update',
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

export const deleteAdminService = createAsyncThunk(
    'adminServices/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/service/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete service');
        }
    }
);

const adminServiceSlice = createSlice({
    name: 'adminServices',
    initialState: {
        data: [],
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdminServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createAdminService.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(createAdminService.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createAdminService.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(updateAdminService.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(updateAdminService.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.data = state.data.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(updateAdminService.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteAdminService.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export default adminServiceSlice.reducer;
