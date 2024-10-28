import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../lib/features/auth/authSlice";

const Logout = ({ style }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8081/logout", {
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
