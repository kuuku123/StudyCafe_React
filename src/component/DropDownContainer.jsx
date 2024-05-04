import React from "react";
import NavItem from "./NavItem";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import Logout from "./Logout";
import { Link } from "react-router-dom";
const DropDownContainer = ({ setLogin }) => {
  const DropDown_style = styled.ul`
    position: absolute;
    z-index: 100000;
    right: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    li {
      padding: 8px 16px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
      &:first-child {
        &:hover {
          background-color: white;
        }
      }
    }
    /* Target only the first li element within DropDownContainer */

    button {
      display: block; /* Treat button as a block-level element */
      width: 100%; /* Make the button full width */
      padding: 8px 16px; /* Add padding to align with list items */
      text-align: left; /* Align text to the left */
      background-color: transparent; /* Remove default button background */
      border: none; /* Remove default button border */
      cursor: pointer; /* Change cursor to pointer on hover */

      &:hover {
        background-color: #f5f5f5; /* Change background color on hover */
      }
    }
  `;

  const Li_style = styled.li`
    font-size: 24px;
    font-style: italic;
  `;
  const link_style = {
    color: "#004080",
    textDecoration: "none",
  };
  return (
    <NavItem icon={<CgProfile></CgProfile>}>
      <DropDown_style>
        <Li_style>{sessionStorage.getItem("user")}</Li_style>
        <li>
          <Link style={link_style} to={"/profile"}>Profile</Link>
        </li>
        <li>Study</li>
        <Logout setLogin={setLogin}></Logout>
      </DropDown_style>
    </NavItem>
  );
};

export default DropDownContainer;
