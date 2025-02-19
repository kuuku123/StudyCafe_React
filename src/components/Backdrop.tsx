import React from "react";
import "./Dialog.css";
const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="Backdrop">{children}</div>
);

export default Backdrop;
