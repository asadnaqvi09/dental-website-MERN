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

export const logoutAdmin = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('adminUser');
            return null;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('adminUser');
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const storedUser = localStorage.getItem('adminUser');
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: localStorage.getItem('token') || null,
        loading: false,
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
                state.token = action.payload.data.token;
                localStorage.setItem('token', action.payload.data.token);
                localStorage.setItem('adminUser', JSON.stringify(action.payload.data.user));
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
