import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3 text-gray-800 font-semibold text-lg">
        🎟️ CC33 Support
        {role && (
          <span className="text-xs font-medium text-gray-500 ml-2 px-2 py-1 bg-gray-100 rounded">
            {role}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Placeholder for more actions later */}
        {/* <Button variant="outlined" size="small">Dashboard</Button> */}
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
