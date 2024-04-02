import React from "react";
import styled from "styled-components";
const FormControl = ({ label, htmlFor, required, error, children }) => {
  const FormControl_Container_style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  `;
  return (
    <FormControl_Container_style>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <div className="error">{error}</div>}
    </FormControl_Container_style>
  );
};

export default FormControl;
