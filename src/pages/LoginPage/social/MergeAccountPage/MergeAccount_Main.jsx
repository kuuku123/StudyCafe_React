import React, { useEffect, useState } from "react";
import * as S from "./MergeAccount_Main_style";
import SocialApi from "../../../../lib/apis/SocialApi";
import HandleResponseApi from "../../../../lib/HandleResponse";

const MergeAccount_Main = () => {
  const[email, setEmail] = useState("")

  const hanldeResponse = HandleResponseApi.useHandleResponse();
  const handleMerge = async () => {
    await SocialApi.mergeAccount();
  };

  const handleCancel = async () => {
    await SocialApi.separateAccount();
  };

  useEffect(() => {
    const getEmail = async () => {
      const response = await SocialApi.getEmail();
      console.log("email => ", response);
      hanldeResponse(response, setEmail , false);
    };
    getEmail();
  }, []);
  return (
    <S.Merge_Account_Main_Container_style>
      <S.Merge_Account_Heading_style>
        Merge Account
      </S.Merge_Account_Heading_style>
      <S.Merge_Account_Text_style>
        You already have an account associated with{" "}
        <strong>{email}</strong>.
      </S.Merge_Account_Text_style>
      <S.Merge_Account_Text_style>
        Would you like to merge your social account with the existing account?
      </S.Merge_Account_Text_style>
      <S.Button_Group_style>
        <S.Primary_Button_style onClick={handleMerge}>
          Yes, Merge Accounts
        </S.Primary_Button_style>
        <S.Secondary_Button_style onClick={handleCancel}>
          No, Keep Separate
        </S.Secondary_Button_style>
      </S.Button_Group_style>
    </S.Merge_Account_Main_Container_style>
  );
};

export default MergeAccount_Main;
