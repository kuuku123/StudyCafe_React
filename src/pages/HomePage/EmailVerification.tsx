import React from "react";
import { Link } from "react-router-dom";
import * as S from "./Homepage_Main_style";

const EmailVerification = () => {
  return (
    <S.Email_Verification_style>
      To finish Study Cafe enrollment <br/>
      <Link to={"/email-resend"}>check your verification email</Link>
    </S.Email_Verification_style>
  );
};

export default EmailVerification;
