import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const createContact = createAsyncThunk(
    'contacts/create',
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact/create-contact', contactData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/contact/get-contacts');
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/contact/delete-contact/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete contact');
        }
    }
);

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        data: [],
        loading: false,
        submitLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.submitLoading = true;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.submitLoading = false;
                if (action.payload?.data) {
                    state.data.push(action.payload.data);
                }
            })
            .addCase(createContact.rejected, (state, action) => {
                state.submitLoading = false;
                state.error = action.payload || 'Failed to create contact';
            })
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item._id !== action.payload);
            });
    },
});

export default contactsSlice.reducer;
