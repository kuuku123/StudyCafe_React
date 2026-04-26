import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../../../lib/MyForm";
import * as S from "./SignupEmailVerification_style";
import SignupEmailVerificationHidden from "./SignupEmailVerificationHidden";
import AuthApi from "../../../lib/apis/AuthApi";
import HandleResponseApi from "../../../lib/HandleResponse";
import { HiCheckCircle } from "react-icons/hi";

interface SignupEmailVerificationProps {
  emailVerified: boolean;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupEmailVerfication: React.FC<SignupEmailVerificationProps> = ({
  emailVerified,
  setEmailVerified,
}) => {
  const [clickable, setClickable] = useState<boolean>(false);
  const [verifiyHidden, setVerifyHidden] = useState<boolean>(false);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const { values, errors } = useContext(formContext)!;

  const handleEmailVerified = async () => {
    const response = await AuthApi.checkAndMakeEmailVerificationCode(
      values.email
    );
    handleResponse(response, () => setVerifyHidden(true), {
      path: "",
      dialog: "",
    });
  };

  useEffect(() => {
    // Check if there are errors specifically for the email field
    setClickable(!!values.email && !errors.email);
  }, [values.email, errors.email]);

  useEffect(() => {
    if (emailVerified) {
      setVerifyHidden(false);
    }
  }, [emailVerified]);

  return (
    <>
      {!emailVerified ? (
        <>
          <S.Email_Verfiy_Button
            clickable={clickable}
            type="button"
            onClick={handleEmailVerified}
          >
            Verify Email Address
          </S.Email_Verfiy_Button>

          {verifiyHidden && (
            <SignupEmailVerificationHidden
              emailVerified={emailVerified}
              setEmailVerified={setEmailVerified}
            />
          )}
        </>
      ) : (
        <S.Verified_Success>
          <HiCheckCircle size={20} />
          Email Verified Successfully
        </S.Verified_Success>
      )}
    </>
  );
};

export default SignupEmailVerfication;
