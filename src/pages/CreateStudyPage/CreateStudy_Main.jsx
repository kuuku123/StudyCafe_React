import React from "react";
import MyEditor from "../../components/Quill-Editor/MyEditor";
import * as S from "./CreateStudyPage_style";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
import HandleResponseApi from "../../lib/HandleResponse";
const CreateStudy_Main = () => {
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleSubmit = async (createStudyForm) => {
    console.log("createSutdyForm = ", createStudyForm);
    console.log("Server API URL ", SERVER_API_URL)
    const raw_response = await fetch(`${SERVER_API_URL}/new-study`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(createStudyForm),
    });
    const response = await raw_response.json();
    console.log(response);
    handleResponse(response);
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  const input_style = {
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    height: "40px",
    minWidth: "200px", // Ensures it doesn't shrink too much
  };

  const full_description_style = {
    width: "100%", // Takes full width of the parent container
    maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
    height: "200px",
    minWidth: "200px", // Ensures it doesn't shrink too much
  };

  return (
    <S.CreateStudy_Main_style>
      <h2>스터디 개설</h2>
      <MyForm.Form
        id="create-study-form"
        initialValue={{
          path: "",
          title: "",
          shortDescription: "",
          fullDescription: "",
          fullDescriptionText: "",
        }}
        validate={validate}
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormControl
          label="스터디 path를 작성해주세요"
          htmlFor="path"
          error={<MyForm.ErrorMessage name="path"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-path"
            name="path"
            placeholder="write path for your study group"
            style={input_style}
          ></MyForm.Field>
        </FormControl>

        <FormControl
          label="스터디 이름을 작성해주세요"
          htmlFor="title"
          error={<MyForm.ErrorMessage name="title"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-title"
            name="title"
            placeholder="write title for your study group"
            style={input_style}
          ></MyForm.Field>
        </FormControl>

        <FormControl
          label="스터디 short description을 작성해주세요"
          htmlFor="shrot-description"
          error={
            <MyForm.ErrorMessage name="short-description"></MyForm.ErrorMessage>
          }
        >
          <MyForm.Field
            id="create-study-shrot-description"
            name="shortDescription"
            placeholder="write short-description for your study group"
            style={input_style}
          ></MyForm.Field>
        </FormControl>

        <FormControl
          label="스터디 full description 을 작성해주세요"
          htmlFor="full-description"
          error={
            <MyForm.ErrorMessage name="full-description"></MyForm.ErrorMessage>
          }
        >
          <MyForm.Field
            id="create-study-full-description"
            name="fullDescription"
            placeholder="write full-description for your study group"
            style={full_description_style}
            as={MyEditor}
          ></MyForm.Field>
        </FormControl>
        <button type="submit">저장하기</button>
      </MyForm.Form>
    </S.CreateStudy_Main_style>
  );
};

export default CreateStudy_Main;
