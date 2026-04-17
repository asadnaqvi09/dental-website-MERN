import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../components/shared/api'

// GET ALL SERVICES
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async () => {
    const res = await api.get('/services');
    return res.data;
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch services";
      });
  },
});

export default serviceSlice.reducer;