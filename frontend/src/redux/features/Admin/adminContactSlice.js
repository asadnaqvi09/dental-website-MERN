import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const fetchAdminContacts = createAsyncThunk(
    'adminContacts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/contact/get-contacts');
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
        }
    }
);

export const deleteAdminContact = createAsyncThunk(
    'adminContacts/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/contact/delete-contact/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete contact');
        }
    }
);

const adminContactSlice = createSlice({
    name: 'adminContacts',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdminContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAdminContact.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export default adminContactSlice.reducer;
