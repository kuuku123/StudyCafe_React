import React from "react";
import NavItem from "./NavItem";
import { CgProfile } from "react-icons/cg";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import * as S from "./Component_style";

const DropDownContainer = ({ setLogin }) => {
  return (
    <NavItem icon={<CgProfile size={"22px"}></CgProfile>}>
      <S.DropDown_style>
        <S.Li_style>{sessionStorage.getItem("user")}</S.Li_style>
        <li>
          <Link style={S.link_style} to={"/profile"}>
            Profile
          </Link>
        </li>
        <li>
          <Link style={S.link_style} to={"/study"}>
            Study
          </Link>
        </li>
        <Logout setLogin={setLogin}></Logout>
      </S.DropDown_style>
    </NavItem>
  );
};

export default DropDownContainer;
