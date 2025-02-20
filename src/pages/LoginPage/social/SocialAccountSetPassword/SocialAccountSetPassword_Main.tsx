import React from "react";
import * as MyForm from "../../../../lib/MyForm";
import FormControl from "../../../../components/FormControl";
import * as S from "./SocialAccountSetPassword_Main_style";
import HandleResponseApi from "../../../../lib/HandleResponse";
import RoutesEnum from "../../../../lib/RoutesEnum";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../lib/features/redux/authSlice";
import ProfileApi from "../../../../lib/apis/ProfileApi";
import AuthApi from "../../../../lib/apis/AuthApi";
import { PasswordForm } from "../../../../utils/type";

const SocialAccountSetPassword_Main = () => {
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  const onSubmit = async (passwordInfo: PasswordForm) => {
    const authResponse = await AuthApi.updatePassword(passwordInfo);
    handleResponse(authResponse, null, { path: "", dialog: "" });

    if (authResponse.status == "OK") {
      const response = await ProfileApi.fetchProfile();
      console.log("SoicalAccountSetPassword => ", response);
      handleResponse(response, (data) => dispatch(loginSuccess(data)), {
        path: RoutesEnum.HOME,
        dialog:
          "now you can login with your email as id and password you just sent",
      });
    }
  };

  const validate = (values: PasswordForm) => {
    console.log("values ==> ", values);
    const errors: Record<string, any> = {};
    if (values.newPassword !== values.newPasswordConfirm) {
      console.log("not same!!");
      errors.newPasswordConfirm = "password is not same";
    }
    return errors;
  };

  return (
    <MyForm.Form
      id="social-set-password"
      initialValue={{
        newPassword: "",
        newPasswordConfirm: "",
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      <FormControl
        label="newPassword"
        htmlFor="newPassword"
        error={<MyForm.ErrorMessage name="newPassword"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="newPassword"
          style={S.Set_Password_Input_style}
          name="newPassword"
          type="password"
          placeholder="write your new password"
        ></MyForm.Field>
      </FormControl>

      <FormControl
        label="newPasswordConfirm"
        htmlFor="newPasswordConfirm"
        error={
          <MyForm.ErrorMessage name="newPasswordConfirm"></MyForm.ErrorMessage>
        }
      >
        <MyForm.Field
          id="newPasswordConfirm"
          style={S.Set_Password_Input_style}
          name="newPasswordConfirm"
          type="password"
          placeholder="confirm your new password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default SocialAccountSetPassword_Main;
