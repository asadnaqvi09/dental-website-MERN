import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../components/shared/api'

export const createAppointment = createAsyncThunk(
    'appointment/create',
    async (data, {rejectWithValue}) => {
        try {
            const res = await api.post('/appointment/create-appointment', data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload.data);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create appointment";
            });
    },
})

export default appointmentSlice.reducer;