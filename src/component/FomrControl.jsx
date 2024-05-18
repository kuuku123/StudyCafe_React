import React from "react";
import * as S from "./Component_style"

const FormControl = ({ label, htmlFor, required, error, children }) => {
  return (
    <S.FormControl_Container_style>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <div className="error">{error}</div>}
    </S.FormControl_Container_style>
  );
};

export default FormControl;
