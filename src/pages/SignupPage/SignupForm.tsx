import React from "react";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FormControl";
import * as CS from "../../components/Component_style";
import { SignUpForm } from "../../utils/type";
import SignupEmailVerfication from "./EmailVerify/SignupEmailVerification";

interface SignupFormProps {
  onSubmit: (data: SignUpForm) => void;
  emailVerified: boolean;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  emailVerified,
  setEmailVerified,
}) => {
  const validate = (values: SignUpForm) => {
    const errors: Record<string, any> = {};
    if (!values.nickname) {
      errors.nickname = "Please enter your nickname";
    }
    if (!values.email) {
      errors.email = "Please enter your email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    if (emailVerified && !values.password) {
      errors.password = "Please enter a password";
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
        label="Nickname"
        htmlFor="nickname"
        error={<MyForm.ErrorMessage name="nickname" />}
      >
        <MyForm.Field
          as={CS.Input_style}
          id="signup-nickname"
          name="nickname"
          placeholder="Choose a nickname"
          autoComplete="nickname"
        />
      </FormControl>

      <FormControl
        label="Email Address"
        htmlFor="email"
        error={<MyForm.ErrorMessage name="email" />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          <MyForm.Field
            as={CS.Input_style}
            id="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={emailVerified}
          />
          <SignupEmailVerfication
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />
        </div>
      </FormControl>

      {emailVerified && (
        <FormControl
          label="Password"
          htmlFor="password"
          error={<MyForm.ErrorMessage name="password" />}
        >
          <MyForm.Field
            as={CS.Input_style}
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </FormControl>
      )}
    </MyForm.Form>
  );
};

export default SignupForm;
