import React from "react";
import NavItem from "./NavItem";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import Logout from "./Logout";
const DropDownContainer = ({setLogin}) => {
  const DropDown_style = styled.ul`
    /* New properties added below */
    position: absolute;
    z-index: 100000;
    right: 1rem;
  `;
  return (
    <NavItem icon={<CgProfile></CgProfile>}>
      <DropDown_style>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
        <li>
          <Logout setLogin={setLogin}></Logout>
        </li>
      </DropDown_style>
    </NavItem>
  );
};

export default DropDownContainer;
