import React from "react";
import { useNavigate } from "react-router-dom";
import * as MyLayout from "./MyLayout";
import Button from "../components/Button";
import Dialog from "../components/Dialog";

const useHandleResponse = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();
  const handleResponse = (response, callback, useNavigate) => {
    console.log("useNavigate => ", useNavigate)
    if (response.status === "OK") {
      console.log("response ok~  ", response.data);
      if (callback) callback(response.data);
      if (useNavigate) navigate("/");
    }
    else if (response.status === 403) {
      console.log("unauthorized");
      openDialog(
        <Dialog
          header={<>Login</>}
          footer={
            <Button onClick={() => closeDialog("/login")}>
              네, 알겠습니다
            </Button>
          }
        ></Dialog>
      );
    } else {
      openDialog(
        <Dialog
          header={<>오류</>}
          footer={<Button onClick={() => closeDialog()}>네, 알겠습니다</Button>}
        >
          <ul>
            {Object.keys &&
              Object.keys(response.data).map((key) => (
                <li key={key}>
                  {key} : {response.data[key]}
                </li>
              ))}
          </ul>
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
