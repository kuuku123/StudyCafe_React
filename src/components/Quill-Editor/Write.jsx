import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = () => {
  return (
    <>
      <ReactQuill
        style={{
          width: "800px",
          height: "300px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      ></ReactQuill>
    </>
  );
};

export default MyEditor;
