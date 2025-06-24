import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import ticketReducer from "./features/tickets/ticketSlice";
import messageReducer from "./features/messages/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
