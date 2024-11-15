import styled from 'styled-components'

export const ToggleSwitch_style = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

export const Input_style = styled.input`
  display: none;
`;

export const Slider_style = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const CheckedSlider_style = styled(Slider_style)`
  background-color: #4caf50;

  &:before {
    transform: translateX(30px);
  }
`;