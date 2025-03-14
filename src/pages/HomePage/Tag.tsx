import React from "react";
import * as S from "./Homepage_Main_style";
interface TagProps {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
}

const Tag: React.FC<TagProps> = ({ Icon, label }) => {
  return (
    <S.Tag_style>
      <Icon size={24} />
      <span>{label}</span>
    </S.Tag_style>
  );
};

export default Tag;
