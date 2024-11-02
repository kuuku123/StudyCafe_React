import React, { useEffect } from "react";
import ProfileApi from "../../../../lib/apis/ProfileApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../lib/features/auth/authSlice";
import HandleResponseApi from "../../../../lib/HandleResponse";
import RoutesEnum from "../../../../lib/RoutesEnum";

const AlreadyMergedAccount = () => {
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  useEffect(() => {
    const getProfile = async () => {
      const profile = await ProfileApi.fetchProfile();
      console.log("profile => ", profile);
      handleResponse(profile, (data) => dispatch(loginSuccess(data)), {
        useNav: true,
        path: RoutesEnum.HOME,
      });
    };
    getProfile();
  }, []);
  return <div>AlreadyMergedAccount</div>;
};

export default AlreadyMergedAccount;
