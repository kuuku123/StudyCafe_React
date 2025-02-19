import React from "react";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FormControl";
import * as S from "./LoginForm_style";
import { LoginFormType } from "../../utils/type";

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const validate = (values: LoginFormType) => {
    const errors: Record<string, any> = {};
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
