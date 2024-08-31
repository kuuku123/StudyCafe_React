import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = ({ style, ...rest }) => {
  const defaultStyle = {
    marginBottom: "50px",
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    height: "300px",
    minWidth: "200px", // Ensures it doesn't shrink too much
  };

  const combinedStyle = { ...defaultStyle, ...style };
  console.log("rest = " + JSON.stringify(rest));
  return (
      <ReactQuill preserveWhitespace style={combinedStyle} {...rest}></ReactQuill>
  );
};

export default MyEditor;
