import React from "react";
import ReactDOM from "react-dom";
import Dialog from "../components/Dialog";
import Backdrop from "../components/Backdrop";
import { useNavigate } from "react-router-dom";

export const layoutContext = React.createContext({});
layoutContext.displayName = "LayoutContext";

export const Layout = ({ children }) => {
  const [dialog, setDialog] = React.useState();

  return (
    <layoutContext.Provider value={{ dialog, setDialog }}>
      {children}
    </layoutContext.Provider>
  );
};

export const useDialog = () => {
  const navigate = useNavigate();
  const { dialog, setDialog } = React.useContext(layoutContext);
  const openDialog = (element) => setDialog(element);
  const closeDialog = (path) => {
    console.log("path => ", path)
    setDialog(null)
    if(path) navigate(path)
  };
  return { dialog, openDialog, closeDialog };
};

export const useLoading = () => {
  const { openDialog, closeDialog: finishLoading } = useDialog();
  const startLoading = (message) => openDialog(<Dialog>{message}</Dialog>);
  return { startLoading, finishLoading };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();
  return (
    <>
      {dialog &&
        ReactDOM.createPortal(
          <Backdrop>{dialog}</Backdrop>,
          document.querySelector("#dialog")
        )}
    </>
  );
};
