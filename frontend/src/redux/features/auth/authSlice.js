import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/shared/api';

export const loginAdmin = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/login', credentials);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const fetchCurrentAdmin = createAsyncThunk(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/auth/me');
            return res.data.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Not authenticated');
        }
    }
);

export const logoutAdmin = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        sessionChecked: false,
        error: null,
    },
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.sessionChecked = true;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.sessionChecked = true;
            })
            .addCase(fetchCurrentAdmin.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.sessionChecked = true;
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutAdmin.rejected, (state) => {
                state.user = null;
            });
    },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
