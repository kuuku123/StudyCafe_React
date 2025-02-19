import React, { ReactNode } from "react";
import * as S from "./ToggleSwitch_style";

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  handleToggle,
  children,
}) => {
  return (
    <S.ToggleSwitch_style>
      <S.Input_style type="checkbox" checked={isOn} onChange={handleToggle} />
      <S.Slider_style isOn={isOn} />
      {children}
    </S.ToggleSwitch_style>
  );
};

export default ToggleSwitch;
