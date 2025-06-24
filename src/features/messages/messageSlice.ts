// features/messages/messageSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Message = {
  id: string;
  ticketId: string;
  sender: string;
  text: string;
  timestamp: string;
};

type MessageState = {
  [ticketId: string]: Message[];
};

const initialState: MessageState = {};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const { ticketId } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = [];
      }
      state[ticketId].push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
