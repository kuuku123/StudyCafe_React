import React, { useContext } from "react";
import { formContext } from "../../lib/MyForm";

interface SingupEmailVerificationProps {
  setEmailVerified: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SignupEmailVerfification: React.FC<SingupEmailVerificationProps> = ({
  setEmailVerified,
}) => {
  const handleEmailVerified = () => {
    console.log(values.email, " email verified");
    setEmailVerified((prev) => !prev);
  };
  const { values } = useContext(formContext)!;
  return <button type="button" onClick={handleEmailVerified}>Verifiy Email</button>;
};

export default SignupEmailVerfification;
