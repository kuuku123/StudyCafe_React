import React from "react";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  return (
    <div>
      스터디 카페 가입을 완료하려면 <Link to={"/email-resend"}>계정 인증 이메일을 확인</Link> 하세요.{" "}
    </div>
  );
};

export default EmailVerification;
