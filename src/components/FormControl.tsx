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
  const label_style: React.CSSProperties = {
    textAlign: "start",
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    minWidth: "200px", // Ensures it doesn't shrink too much
  };
  return (
    <S.FormControl_Container_style>
      <label style={label_style} htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <div className="error">{error}</div>}
    </S.FormControl_Container_style>
  );
};

export default FormControl;
