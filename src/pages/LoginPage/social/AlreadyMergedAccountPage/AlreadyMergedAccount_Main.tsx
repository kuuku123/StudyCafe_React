import React, { useEffect } from "react";
import ProfileApi from "../../../../lib/apis/ProfileApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../lib/features/redux/authSlice";
import HandleResponseApi from "../../../../lib/HandleResponse";
import RoutesEnum from "../../../../lib/RoutesEnum";

const AlreadyMergedAccount = () => {
  const dispatch = useDispatch();
  const handleResponse = HandleResponseApi.useHandleResponse();
  useEffect(() => {
    const getProfile = async () => {
      const profile = await ProfileApi.fetchMyProfile();
      console.log("profile => ", profile);
      handleResponse(profile, (data) => dispatch(loginSuccess(data)), {
        path: RoutesEnum.HOME,
        dialog: "",
      });
    };
    getProfile();
  }, []);
  return <div>AlreadyMergedAccount</div>;
};

export default AlreadyMergedAccount;
