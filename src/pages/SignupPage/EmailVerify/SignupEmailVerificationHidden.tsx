import React, { ChangeEvent, useContext, useState } from "react";
import * as S from "./SignupEmailVerification_style";
import AuthApi from "../../../lib/apis/AuthApi";
import { formContext } from "../../../lib/MyForm";
import HandleResponseApi from "../../../lib/HandleResponse";

interface SingupEmailVerificationHiddenProps {
  emailVerified: boolean;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupEmailVerificationHidden: React.FC<
  SingupEmailVerificationHiddenProps
> = ({ emailVerified, setEmailVerified }) => {
  const [isSix, setIsSix] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const { values } = useContext(formContext)!;
  const handleResponse = HandleResponseApi.useHandleResponse();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only update state if the input is 6 characters or less
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
      dialog: "Verification Code Resent",
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
      {!emailVerified ? (
        <S.Hidden_Container>
          <div>
            An authentication code has been sent to the email address you
            entered.
          </div>
          <S.Code_Input
            value={code}
            placeholder="enter 6 digit code"
            onChange={handleChange}
          />
          <S.Hidden_Button_Container>
            <S.Email_Resend_Button type="button" onClick={handleResend}>ReSend</S.Email_Resend_Button>
            <S.Email_Verfiy_Button
              type="button"
              clickable={isSix}
              onClick={handleVerify}
            >
              Verify
            </S.Email_Verfiy_Button>
          </S.Hidden_Button_Container>
        </S.Hidden_Container>
      ) : (
        <S.Verified_Success>Success</S.Verified_Success>
      )}
    </>
  );
};

export default SignupEmailVerificationHidden;
