import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;

export const Merge_Account_Main_Container_style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

export const Merge_Account_Heading_style = styled.h2`
  margin-bottom: 16px;
  font-size: 56px;
  color: #333;
`;

export const Merge_Account_Text_style = styled.p`
  margin: 8px 0;
  font-size: 32px;
  color: #555;
  text-align: center;
`;

export const Button_Group_style = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

export const Button_style = styled.button`
  padding: 12px 24px;
  font-size: 32px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const Primary_Button_style = styled(Button_style)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Secondary_Button_style = styled(Button_style)`
  background-color: #ccc;
  color: #333;

  &:hover {
    background-color: #999;
  }
`;