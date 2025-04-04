import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../../../lib/MyForm";
import * as S from "./SignupEmailVerification_style";
import SignupEmailVerificationHidden from "./SignupEmailVerificationHidden";
import AuthApi from "../../../lib/apis/AuthApi";
import HandleResponseApi from "../../../lib/HandleResponse";

interface SingupEmailVerificationProps {
  emailVerified: boolean;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupEmailVerfication: React.FC<SingupEmailVerificationProps> = ({
  emailVerified,
  setEmailVerified,
}) => {
  const [clickable, setClickable] = useState<boolean>(false);
  const [verifiyHidden, setVerifyHidden] = useState<boolean>(false);
  const handleResponse = HandleResponseApi.useHandleResponse();
  const { values, errors } = useContext(formContext)!;

  const handleEmailVerified = async () => {
    console.log("handleEmailVerified => ", values.email)
    const response = await AuthApi.checkAndMakeEmailVerificationCode(
      values.email
    );
    handleResponse(response, (prev) => setVerifyHidden(!prev), {
      path: "",
      dialog: "",
    });
  };
  useEffect(() => {
    setClickable(Object.keys(errors).length === 0);
  }, [errors]);

  useEffect(() => {
    setEmailVerified(false);
  }, [values.email]);

  return (
    <>
      {!emailVerified && (
        <S.Email_Verfiy_Button
          clickable={clickable}
          type="button"
          onClick={handleEmailVerified}
        >
          Verifiy Email
        </S.Email_Verfiy_Button>
      )}

      {verifiyHidden && (
        <SignupEmailVerificationHidden
          emailVerified={emailVerified}
          setEmailVerified={setEmailVerified}
        ></SignupEmailVerificationHidden>
      )}
    </>
  );
};

export default SignupEmailVerfication;
