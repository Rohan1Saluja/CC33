import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "CUSTOMER" | "AGENT" | "ADMIN";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: UserRole | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") as UserRole | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; role: UserRole }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
