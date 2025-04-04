import React from "react";
import { useNavigate } from "react-router-dom";
import * as MyLayout from "./MyLayout";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import RoutesEnum from "./RoutesEnum";
import { ApiResponse } from "../utils/type";

interface NavigateOptions {
  path: string;
  dialog: string;
}
const useHandleResponse = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = MyLayout.useDialog();

  const handleResponse = (
    response: ApiResponse,
    callback: ((data: any) => void) | null,
    useNavigate: NavigateOptions
  ) => {

    if (response.status === "OK") {
      if (useNavigate.dialog == "" && callback) {
        callback(response.data);
        if (useNavigate.path !== "") {
          navigate(useNavigate.path);
        }
      } else if (useNavigate.path !== "" && useNavigate.dialog !== "") {
        openDialog(
          <Dialog
            header={<></>}
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
      } else if (useNavigate.path !== "") {
        navigate(useNavigate.path);
      } else if (useNavigate.path == "" && useNavigate.dialog !== "") {
        openDialog(
          <Dialog
            header={<></>}
            footer={
              <Button
                onClick={() => {
                  closeDialog();
                }}
              >
                {useNavigate.dialog}
              </Button>
            }
          />
        );
      }
    } else if (response.status === "403") {
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
      openDialog(
        <Dialog
          header={<>Error</>}
          footer={<Button onClick={() => closeDialog()}>Close</Button>}
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
