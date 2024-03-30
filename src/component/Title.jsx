import React from "react";

const Title = ({ loginUrl = "", children }) => {
  console.log("Title", children);
  if (loginUrl) {
    return <h1>{children}</h1>;
  }
  return (
    <div className="title-container">
      <h1>{children}</h1>
      <h2>로그인</h2>
    </div>
  );
};

export default Title;
