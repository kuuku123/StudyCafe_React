import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../../lib/MyForm";
import * as S from "./SignupForm_style";

interface SingupEmailVerificationProps {
  setEmailVerified: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SignupEmailVerfification: React.FC<SingupEmailVerificationProps> = ({
  setEmailVerified,
}) => {
  const [clickable, setClickable] = useState<boolean>(false);
  const handleEmailVerified = () => {
    console.log(values.email, " email verified");
    setEmailVerified((prev) => !prev);
  };
  const { values, errors } = useContext(formContext)!;

  useEffect(() => {
    setClickable(Object.keys(errors).length === 0);
  }, [errors]);

  return (
    <S.Email_Verfiy_Button
      clickable={clickable}
      type="button"
      onClick={handleEmailVerified}
    >
      Verifiy Email
    </S.Email_Verfiy_Button>
  );
};

export default SignupEmailVerfification;
