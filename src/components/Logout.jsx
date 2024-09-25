import React, { useContext } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Logout = ({style, setLogin}) => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("user");
    Cookies.remove("JSESSIONID");
    setLogin(false);
    const response = await fetch("http://localhost:8081/logout", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      navigate("/")
      return res.json();
    });
  };

  return (
    <span style={style} onClick={handleLogout}>Logout</span>
  )
}

export default Logout