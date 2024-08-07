import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = ({style}) => {
  return (
    <>
      <ReactQuill
        style={style}
      ></ReactQuill>
    </>
  );
};

export default MyEditor;
