import React from "react";
import styled from "styled-components";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../component/FomrControl";

const SignupForm = ({ onSubmit }) => {
  const signup_input_style = {
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
  const Signup_Container_style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  `;
  const validate = (values) => {
    const errors = {};
    if (!values.nickname) {
      errors.nickname = "write nickname for your account";
    }
    if (!values.email) {
      errors.email = "write email for your account";
    }
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email
      )
    ) {
      errors.email = "write valid email address";
    }
    console.log("errors => ", errors);
    return errors;
  };
  return (
    <MyForm.Form
      initialValue={{
        nickname: "",
        email: "",
        password: "",
      }}
      validate={validate}
      onSumbit={onSubmit}
    >
        <FormControl
          label="닉네임"
          htmlFor="nickName"
          error={<MyForm.ErrorMessage name="nickname"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="signup-nickname"
            style={signup_input_style}
            name="nickname"
            placeholder="write your nickname"
          ></MyForm.Field>
        </FormControl>
        <FormControl
          label="이메일"
          htmlFor="email"
          error={<MyForm.ErrorMessage name="email"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="email"
            style={signup_input_style}
            name="email"
            placeholder="write your email"
          ></MyForm.Field>
        </FormControl>
        <FormControl
          label="비밀번호"
          htmlFor="password"
          error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="password"
            style={signup_input_style}
            name="password"
            placeholder="write your password"
          ></MyForm.Field>
        </FormControl>
    </MyForm.Form>
  );
};

export default SignupForm;
