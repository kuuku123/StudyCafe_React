import React, { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CSSProperties } from "styled-components";

interface MyEditorProps extends ReactQuillProps {
  style?: CSSProperties;
}
const MyEditor: React.FC<MyEditorProps> = ({ style, ...rest }) => {
  const defaultStyle = {
    marginBottom: "50px",
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    height: "300px",
    minWidth: "200px", // Ensures it doesn't shrink too much
  };

  const combinedStyle = { ...defaultStyle, ...style };
  return (
    <ReactQuill preserveWhitespace style={combinedStyle} {...rest}></ReactQuill>
  );
};

export default MyEditor;
