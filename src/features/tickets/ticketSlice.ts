import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TicketModel } from "../../types/ticket.model";

interface TicketState {
  tickets: TicketModel[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const res = await axios.get<TicketModel[]>("/api/tickets.json");
    return res.data;
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load tickets";
      });
  },
});

export const { addTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
