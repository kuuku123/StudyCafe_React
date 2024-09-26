import React from "react";
import { useNavigate } from "react-router-dom";
import * as MyLayout from "./MyLayout";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import RoutesEnum from "./RoutesEnum";

const useHandleResponse = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();

  const handleResponse = (
    response,
    callback,
    useNavigate = { useNav: true, path: RoutesEnum.HOME }
  ) => {
    console.log("useNavigate => ", useNavigate);

    if (response.status === "OK") {
      if (callback) callback(response.data);
      if (typeof useNavigate === "boolean") {
        console.log("do nothing");
      } else if (useNavigate.useNav) {
        console.log("hiihi - ", useNavigate.useNav, useNavigate.path);
        navigate(useNavigate.path);
      }
    } else if (response.status === 403) {
      console.log("unauthorized");
      openDialog(
        <Dialog
          header={<>Login</>}
          footer={
            <Button onClick={() => closeDialog(RoutesEnum.LOGIN)}>
              네, 알겠습니다
            </Button>
          }
        ></Dialog>
      );
    } else {
      console.log("response => ", response);
      openDialog(
        <Dialog
          header={<>오류</>}
          footer={<Button onClick={() => closeDialog()}>네, 알겠습니다</Button>}
        >
          {response.data ? (
            <ul>
              {Object.keys(response.data).map((key) => (
                <li key={key}>
                  {key} : {response.data[key]}
                </li>
              ))}
            </ul>
          ) : response.message && (
            <span>{response.message}</span>
          )}
        </Dialog>
      );
    }
  };
  return handleResponse;
};

const HandleResponseApi = {
  useHandleResponse,
};

export default HandleResponseApi;
