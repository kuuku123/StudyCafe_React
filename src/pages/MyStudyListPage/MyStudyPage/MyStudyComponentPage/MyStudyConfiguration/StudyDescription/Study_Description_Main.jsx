import React from "react";
import * as S from "./Study_Description_Main style";
import * as MyForm from "../../../../../../lib/MyForm";
import HandleResponseApi from "../../../../../../lib/HandleResponse";
import FormControl from "../../../../../../components/FomrControl";
import MyEditor from "../../../../../../components/Quill-Editor/MyEditor";
import Button from "../../../../../../components/Button";

const Study_Description_Main = () => {
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleSubmit = async (createStudyForm) => {};
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
    <S.Study_Description_Main_style>
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
          label="write study path"
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
          label="write study title (study name)"
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
          label="write study's short description"
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
          label="wrtie study's full description"
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
        <Button type="sumbit">Save</Button>
      </MyForm.Form>
    </S.Study_Description_Main_style>
  );
};

export default Study_Description_Main;
