import React from "react";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
import * as S from "./SignupForm_style";

const SignupForm = ({ onSubmit }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.nickname) {
      errors.nickname = "write nickname for your account";
    }
    if (!values.email) {
      errors.email = "write email for your account";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "write valid email address";
    }
    return errors;
  };
  return (
    <MyForm.Form
      id="signup-form"
      initialValue={{
        nickname: "",
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      <FormControl
        label="NickName"
        htmlFor="nickname"
        error={<MyForm.ErrorMessage name="nickname"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="signup-nickname"
          style={S.signup_input_style}
          name="nickname"
          placeholder="write your nickname"
        ></MyForm.Field>
      </FormControl>

      <FormControl
        label="Email"
        htmlFor="email"
        error={<MyForm.ErrorMessage name="email"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="email"
          style={S.signup_input_style}
          name="email"
          type="input"
          placeholder="write your email"
        ></MyForm.Field>
      </FormControl>

      <FormControl
        label="Password"
        htmlFor="password"
        error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="password"
          style={S.signup_input_style}
          name="password"
          type="password"
          placeholder="write your password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default SignupForm;
