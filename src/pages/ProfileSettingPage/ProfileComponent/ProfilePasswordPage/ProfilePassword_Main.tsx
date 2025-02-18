import React from "react";
import { useDispatch } from "react-redux";
import HandleResponseApi from "../../../../lib/HandleResponse";
import * as MyForm from "../../../../lib/MyForm";
import FormControl from "../../../../components/FomrControl";
import RoutesEnum from "../../../../lib/RoutesEnum";
import ProfileApi from "../../../../lib/apis/ProfileApi";
import { loginSuccess } from "../../../../lib/features/redux/authSlice";
import * as S from "./ProfilePassword_Main_style";

const ProfilePassword_Main = () => {
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  const onSubmit = async (passwordInfo) => {
    const response = await ProfileApi.updatePassword(passwordInfo);
    handleResponse(response, (data) => dispatch(loginSuccess(data)), {
      useNav: true,
      path: RoutesEnum.HOME,
      dialog:
        "password updated successfully",
    });
  };

  const validate = (values) => {
    console.log("values ==> ", values);
    const errors = {};
    if (values.newPassword !== values.newPasswordConfirm) {
      console.log("not same!!");
      errors.newPasswordConfirm = "password is not same";
    }
    return errors;
  };

  return (
    <>
      <S.Profile_Password_Container_style>
        <S.Profile_Password_Title_style>
          Update Password
        </S.Profile_Password_Title_style>
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
            error={
              <MyForm.ErrorMessage name="newPassword"></MyForm.ErrorMessage>
            }
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
        <S.Set_Password_Button_style type="submit" form="social-set-password">
          Set Password
        </S.Set_Password_Button_style>
      </S.Profile_Password_Container_style>
    </>
  );
};

export default ProfilePassword_Main;
