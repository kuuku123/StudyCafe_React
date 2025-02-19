import React, { ReactNode } from "react";
import * as MyLayout from "../lib/MyLayout";
import * as S from "./Component_style";

interface PageProps {
  header: ReactNode;
  children?: ReactNode;
  footer: ReactNode;
}

const Page: React.FC<PageProps> = ({ header, children, footer }) => {
  return (
    <S.Page_style>
      <S.Header_style>{header}</S.Header_style>
      <S.Main_style>{children}</S.Main_style>
      <S.Footer_style>{footer}</S.Footer_style>
      <MyLayout.DialogContainer></MyLayout.DialogContainer>
    </S.Page_style>
  );
};

export default Page;
