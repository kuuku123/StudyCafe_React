import React from "react";
import * as S from "./Tag_style";
interface TagProps {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ Icon, label ,onClick}) => {
  return (
    <S.Tag_style onClick={onClick}>
      <Icon size={24} />
      <span>{label}</span>
    </S.Tag_style>
  );
};

export default Tag;
