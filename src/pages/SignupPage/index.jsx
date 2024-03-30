import React from "react";
import styled from "styled-components";
import Page from "../../component/Page";
import Title from "../../component/Title";
import CopyRight from "../../component/CopyRight";

const SignupPage = () => {
  const Header_Input_style = styled.input`
    margin-left: 10px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none; /* Remove the default focus outline */
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    height: auto;
  `;
  const Header_Image_style = styled.img`
    width: 70px; /* Set the width of the image */
    height: auto; /* Maintain aspect ratio */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  `;
  return (
    <div>
      <Page
        header={
          <Title>
            <Header_Image_style src="/images/image.png"></Header_Image_style>
            <Header_Input_style></Header_Input_style>
          </Title>
        }
        footer={<CopyRight></CopyRight>}
      >
        sign-up page
      </Page>
    </div>
  );
};

export default SignupPage;
