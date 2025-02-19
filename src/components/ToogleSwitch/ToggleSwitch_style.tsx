import styled from "styled-components";

export const ToggleSwitch_style = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 150px;
  height: 30px;
  gap: 20px;
  cursor: pointer;
`;

// Hidden checkbox for toggle logic
export const Input_style = styled.input`
  display: none;
`;

interface SliderProps {
  isOn: boolean;
}

// The slider background
export const Slider_style = styled.span<SliderProps>`
  position: relative;
  width: 40%;
  height: 100%;
  background-color: ${(props) => (props.isOn ? "#4caf50" : "#ccc")};
  border-radius: 30px;
  transition: background-color 0.4s;

  &::before {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    bottom: 2px;
    left: ${(props) => (props.isOn ? "calc(100% - 28px)" : "2px")};
    transition: left 0.4s;
  }
`;
