import React from "react";
import styled from "styled-components";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../component/FomrControl";

const LoginForm = ({ onSubmit }) => {

  const login_input_style = {
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s ease",
    height: "auto",
    marginTop: "10px",
    padding: "0.375rem 0.75rem",
    width: "600px",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nicknameOrEmail) {
      errors.nicknameOrEmail = "write nickname or email for login"
    }
    console.log("errors => ", errors);
    return errors;
  };

  return (
    <MyForm.Form
      id="login-form"
      initialValue={{
        nicknameOrEmail: "",
        password: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      <FormControl
        label="닉네임"
        htmlFor="nicknameOrEmail"
        error={<MyForm.ErrorMessage name="nicknameOrEmail"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="login-nicknameOrEmail"
          style={login_input_style}
          name="nicknameOrEmail"
          placeholder="write your nickname or email"
        ></MyForm.Field>
      </FormControl>
      <FormControl
        label="비밀번호"
        htmlFor="password"
        error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="password"
          style={login_input_style}
          name="password"
          type="password"
          placeholder="write your password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default LoginForm;
