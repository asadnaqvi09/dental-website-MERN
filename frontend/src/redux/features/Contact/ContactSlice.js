import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/shared/api";

export const createContact = createAsyncThunk (
    'contact/create-contact',
    async (contactData, thunkAPI) => {
        try {
            const response = await api.post('/contact/create-contact', contactData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload.data);
            })
            .addCase(createContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create contact";
            });
    },
})

export default contactSlice.reducer;