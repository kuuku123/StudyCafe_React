import React, { ReactNode } from "react";
import NavItem from "../NavItem";
import * as S from "./DropDown_style";

interface DropDownContainerProps {
  profile: ReactNode;
  header: ReactNode;
  children?: ReactNode;
}

const DropDownContainer: React.FC<DropDownContainerProps> = ({
  profile,
  header,
  children,
}) => {
  return (
    <NavItem icon={profile}>
      <S.DropDown_style>
        <S.DropDown_Header_style>{header}</S.DropDown_Header_style>
        {children}
      </S.DropDown_style>
    </NavItem>
  );
};

export default DropDownContainer;
