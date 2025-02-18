import React from "react";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
import * as S from "./LoginForm_style";

const LoginForm = ({ onSubmit }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.nicknameOrEmail) {
      errors.nicknameOrEmail = "write nickname or email for login";
    }
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
        label="NickName"
        htmlFor="nicknameOrEmail"
        error={
          <MyForm.ErrorMessage name="nicknameOrEmail"></MyForm.ErrorMessage>
        }
      >
        <MyForm.Field
          id="login-nicknameOrEmail"
          style={S.login_input_style}
          name="nicknameOrEmail"
          placeholder="write your nickname or email"
        ></MyForm.Field>
      </FormControl>
      <FormControl
        label="Password"
        htmlFor="password"
        error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="password"
          style={S.login_input_style}
          name="password"
          type="password"
          placeholder="write your password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default LoginForm;
