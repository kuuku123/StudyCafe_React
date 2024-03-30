import React from "react";
import styled from "styled-components";

const CopyRight = () => {
  const CopyRight_style = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;
  return (
    <CopyRight_style>
      <img src="/images/image.png" width="100"></img>
      &copy; React Practice 2024
    </CopyRight_style>
  );
};

export default CopyRight;
