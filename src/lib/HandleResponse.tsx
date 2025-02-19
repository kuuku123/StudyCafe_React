import React from "react";
import { useNavigate } from "react-router-dom";
import * as MyLayout from "./MyLayout";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import RoutesEnum from "./RoutesEnum";
import { ApiResponse } from "../utils/type";

interface NavigateOptions {
  useNav: boolean;
  path: string;
  dialog?: string; // or undefined if you prefer
}
const useHandleResponse = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();

  const handleResponse = (
    response: ApiResponse,
    callback: ((data: any) => void) | null,
    useNavigate: NavigateOptions | boolean = {
      useNav: true,
      path: RoutesEnum.HOME,
      dialog: undefined,
    }
  ) => {
    console.log("useNavigate => ", useNavigate);

    // First, narrow the type if useNavigate is a boolean.
    if (typeof useNavigate === "boolean") {
      // In case useNavigate is a boolean, we might:
      // - Simply call the callback if the response is OK.
      // - Optionally, navigate if the boolean is true.
      if (response.status === "OK" && callback) {
        callback(response.data);
      }
      if (useNavigate) {
        navigate(RoutesEnum.HOME);
      }
      return; // Exit early to avoid accessing properties on a boolean.
    }

    // Now, useNavigate is of type NavigateOptions.
    if (response.status === "OK") {
      if (useNavigate.dialog == undefined && callback) {
        console.log("first callback ? ", useNavigate.dialog);
        callback(response.data);
        if (useNavigate.path !== undefined) {
          navigate(useNavigate.path);
        }
      } else if (useNavigate.useNav && useNavigate.dialog !== undefined) {
        console.log("dialog => ", useNavigate.dialog);
        openDialog(
          <Dialog
            header={<>Login</>}
            footer={
              <Button
                onClick={() => {
                  if (callback) {
                    callback(response.data);
                  }
                  closeDialog(useNavigate.path);
                }}
              >
                {useNavigate.dialog}
              </Button>
            }
          />
        );
      } else if (useNavigate.useNav) {
        console.log("hiihi - ", useNavigate.useNav, useNavigate.path);
        navigate(useNavigate.path);
      }
    } else if (response.status === "403") {
      console.log("unauthorized");
      openDialog(
        <Dialog
          header={<>Login</>}
          footer={
            <Button onClick={() => closeDialog(RoutesEnum.LOGIN)}>
              네, 알겠습니다
            </Button>
          }
        />
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
          ) : (
            response.message && <span>{response.message}</span>
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
