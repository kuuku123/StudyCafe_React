import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import Dialog from "../components/Dialog";
import Backdrop from "../components/Backdrop";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const layoutContext = React.createContext<{
  dialog?: React.ReactElement | null;
  setDialog: (dialog: React.ReactElement | null) => void;
}>({
  dialog: null,
  setDialog: () => {},
});
layoutContext.displayName = "LayoutContext";

export const Layout = ({ children }: LayoutProps) => {
  const [dialog, setDialog] = React.useState<React.ReactElement | null>(null);
  return (
    <layoutContext.Provider value={{ dialog, setDialog }}>
      {children}
    </layoutContext.Provider>
  );
};

export const useDialog = () => {
  const navigate = useNavigate();
  const { dialog, setDialog } = React.useContext(layoutContext);
  const openDialog = (element: React.ReactElement) => setDialog(element);
  const closeDialog = (path?: string) => {
    console.log("path => ", path);
    setDialog(null);
    if (path) navigate(path);
  };
  return { dialog, openDialog, closeDialog };
};

export const useLoading = () => {
  const { openDialog, closeDialog: finishLoading } = useDialog();
  const startLoading = (message: ReactNode) =>
    openDialog(<Dialog>{message}</Dialog>);
  return { startLoading, finishLoading };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();
  return (
    <>
      {dialog &&
        ReactDOM.createPortal(
          <Backdrop>{dialog}</Backdrop>,
          document.querySelector("#dialog")!
        )}
    </>
  );
};
