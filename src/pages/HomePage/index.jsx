import React from "react";
import Page from "../../component/Page";
import Title from "../../component/Title";

const HomePage = () => {
  return (
    <div>
      <Page
        header={
          <Title>
            <a>
              <img src="/images/image.png" width="30" height="30"></img>
            </a>
            <input type="text" placeholder="스터디 찾기"></input>
          </Title>
        }
      ></Page>
    </div>
  );
};

export default HomePage;
