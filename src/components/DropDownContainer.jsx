import React from "react";
import NavItem from "./NavItem";
import * as S from "./Component_style";

const DropDownContainer = ({ profile, children }) => {
  return (
    <NavItem icon={profile}>
      <S.DropDown_style>{children}</S.DropDown_style>
    </NavItem>
  );
};

export default DropDownContainer;
