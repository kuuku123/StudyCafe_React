import React from "react";
import * as S from "./ToggleSwitch_style";

const ToggleSwitch = ({ isOn, handleToggle, children }) => {
  return (
    <S.ToggleSwitch_style>
      <S.Input_style type="checkbox" checked={isOn} onChange={handleToggle} />
      <S.Slider_style isOn={isOn} />
      {children}
    </S.ToggleSwitch_style>
  );
};

export default ToggleSwitch;
