import React, { useContext } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Logout = ({setLogin}) => {

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
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout