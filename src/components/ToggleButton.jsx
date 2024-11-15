import React, { useState } from "react";
import * as S from "./ToggleButton_style";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    console.log(`Switch is ${!isOn ? "ON" : "OFF"}`);
  };

  return (
    <S.ToggleSwitch_style>
      <S.Input_style type="checkbox" checked={isOn} onChange={handleToggle} />
      {isOn ? <S.CheckedSlider_style /> : <S.Slider_style />}
    </S.ToggleSwitch_style>
  );
};

export default ToggleButton;
