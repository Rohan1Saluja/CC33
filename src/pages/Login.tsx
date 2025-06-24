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
    const fakeToken = "fake-jwt-token";
    dispatch(login({ token: fakeToken, role }));
    navigate("/tickets");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/20 via-white to-primary/20"
      style={{
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)),
      url('/bg-doodles.svg')
    `,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
      }}
    >
      <div className="w-full max-w-sm bg-primary/5 shadow-lg rounded-xl p-6 space-y-6 border border-secondary-200 backdrop-blur-xs">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">CC33 Support</h1>
          <p className="text-sm text-gray-500 mt-1">Login to your dashboard</p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="block w-full mt-1 p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-800"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="AGENT">Agent</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700 hover:cursor-pointer transition font-medium"
        >
          Login as {role}
        </button>
      </div>
    </div>
  );
};

export default Login;
