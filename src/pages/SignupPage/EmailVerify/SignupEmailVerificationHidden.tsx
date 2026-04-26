import React, { ChangeEvent, useContext, useState } from "react";
import * as S from "./SignupEmailVerification_style";
import AuthApi from "../../../lib/apis/AuthApi";
import { formContext } from "../../../lib/MyForm";
import HandleResponseApi from "../../../lib/HandleResponse";
import { HiMail } from "react-icons/hi";

interface SignupEmailVerificationHiddenProps {
  emailVerified: boolean;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupEmailVerificationHidden: React.FC<
  SignupEmailVerificationHiddenProps
> = ({ emailVerified, setEmailVerified }) => {
  const [isSix, setIsSix] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const { values } = useContext(formContext)!;
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    if (inputValue.length <= 6) {
      setCode(inputValue);
      setIsSix(inputValue.length === 6);
    }
  };

  const handleResend = async () => {
    const response = await AuthApi.checkAndMakeEmailVerificationCode(
      values.email
    );
    handleResponse(response, null, {
      path: "",
      dialog: "A new verification code has been sent to your email.",
    });
  };

  const verifySuccess = () => {
    setEmailVerified(true);
    setCode("");
  };

  const handleVerify = async () => {
    const response = await AuthApi.verifyEmail({
      email: values.email,
      code: code,
    });
    handleResponse(response, verifySuccess, {
      path: "",
      dialog: "",
    });
  };

  return (
    <>
      {!emailVerified && (
        <S.Hidden_Container>
          <div style={{ display: 'flex', gap: '0.75rem', color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
            <HiMail size={20} style={{ color: '#6366f1', flexShrink: 0 }} />
            <span>
              We've sent a 6-digit verification code to <strong>{values.email}</strong>.
            </span>
          </div>
          <S.Code_Input
            value={code}
            placeholder="000000"
            onChange={handleChange}
            maxLength={6}
          />
          <S.Hidden_Button_Container>
            <S.Email_Resend_Button type="button" onClick={handleResend}>
              Resend Code
            </S.Email_Resend_Button>
            <S.Email_Verfiy_Button
              type="button"
              clickable={isSix}
              onClick={handleVerify}
              style={{ width: 'auto' }}
            >
              Verify Code
            </S.Email_Verfiy_Button>
          </S.Hidden_Button_Container>
        </S.Hidden_Container>
      )}
    </>
  );
};

export default SignupEmailVerificationHidden;
