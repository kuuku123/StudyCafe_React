import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../lib/features/redux/authSlice";

const Logout = ({ style }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await fetch(`${API_GATEWAY_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <div style={style} onClick={handleLogout}>
      <li>Logout</li>
    </div>
  );
};

export default Logout;
