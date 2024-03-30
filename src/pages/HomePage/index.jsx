import React from "react";
import Page from "../../component/Page";
import Title from "../../component/Title";

const HomePage = () => {
  console.log("HomePage");
  return (
    <div>
      <Page
        header={
          <Title>
            <input type="text" placeholder="스터디 찾기"></input>
          </Title>
        }
      ></Page>
    </div>
  );
};

export default HomePage;
