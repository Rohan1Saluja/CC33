import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<"CUSTOMER" | "AGENT" | "ADMIN">(
    "AGENT"
  );

  const handleLogin = () => {
    // Simulate token
    const fakeToken = "fake-jwt-token";
    dispatch(login({ token: fakeToken, role }));
    navigate("/tickets");
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4 bg-lime-100">
      <h1 className="text-2xl font-semibold">Login</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="p-2 border rounded"
      >
        <option value="CUSTOMER">Customer</option>
        <option value="AGENT">Agent</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-primary-600 text-white rounded-xl"
      >
        Login as {role}
      </button>
    </div>
  );
};

export default Login;
