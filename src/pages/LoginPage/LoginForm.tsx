import React from "react";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FormControl";
import * as CS from "../../components/Component_style";
import { LoginFormType } from "../../utils/type";

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const validate = (values: LoginFormType) => {
    const errors: Record<string, any> = {};
    if (!values.nicknameOrEmail) {
      errors.nicknameOrEmail = "Please enter your nickname or email";
    }
    if (!values.password) {
      errors.password = "Please enter your password";
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
        label="Nickname or Email"
        htmlFor="nicknameOrEmail"
        error={
          <MyForm.ErrorMessage name="nicknameOrEmail"></MyForm.ErrorMessage>
        }
      >
        <MyForm.Field
          as={CS.Input_style}
          id="login-nicknameOrEmail"
          name="nicknameOrEmail"
          placeholder="Enter your nickname or email"
          autoComplete="username"
        ></MyForm.Field>
      </FormControl>
      <FormControl
        label="Password"
        htmlFor="password"
        error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          as={CS.Input_style}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default LoginForm;
