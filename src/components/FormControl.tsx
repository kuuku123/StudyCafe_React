import React, { ReactNode } from "react";
import * as S from "./Component_style";

interface FormControlProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: ReactNode;
  children: ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  htmlFor,
  required,
  error,
  children,
}) => {
  return (
    <S.FormControl_Container_style>
      <S.Label_style htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </S.Label_style>
      {children}
      {error && <div className="error">{error}</div>}
    </S.FormControl_Container_style>
  );
};

export default FormControl;
