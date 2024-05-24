import React from "react";
import * as MyLayout from "../lib/MyLayout";

const Page = ({ header, children, footer }) => {
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
      <MyLayout.DialogContainer></MyLayout.DialogContainer>
    </div>
  );
};

export default Page;
