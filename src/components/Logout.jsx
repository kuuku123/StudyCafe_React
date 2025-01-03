import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../lib/features/redux/authSlice";

const Logout = ({ style }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await fetch(`${SERVER_API_URL}/logout`, {
      credentials: "include",
      method: "GET",
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
    <span style={style} onClick={handleLogout}>
      Logout
    </span>
  );
};

export default Logout;
