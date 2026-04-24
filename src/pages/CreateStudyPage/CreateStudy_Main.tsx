import React, { useState } from "react";
import MyEditor from "../../components/Quill-Editor/MyEditor";
import * as S from "./CreateStudy_Main_style";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FormControl";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";
import StudyApi from "../../lib/apis/StudyApi";
import Button from "../../components/Button";
import { StudyForm } from "../../utils/type";
import { Input_style } from "../../components/Component_style";

const CreateStudy_Main = () => {
  const [img, setImage] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };
  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleSubmit = async (createStudyForm: StudyForm) => {
    createStudyForm.studyImage = typeof img === "string" ? img : undefined;
    const response = await StudyApi.createStudy(createStudyForm);
    handleResponse(response, null, {
      path: RoutesEnum.MY_STUDY_LIST,
      dialog: "",
    });
  };

  const validate = () => {
    const errors = {};
    return errors;
  };


  return (
    <S.Grid_Container_style>
      <S.CreateStudy_Main_style>
        <h2>Create Study</h2>
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
            label="Write study path"
            htmlFor="path"
            error={<MyForm.ErrorMessage name="path"></MyForm.ErrorMessage>}
          >
            <MyForm.Field
              id="create-study-path"
              name="path"
              placeholder="e.g. spring-boot-study"
              as={Input_style}
            ></MyForm.Field>
          </FormControl>

          <FormControl
            label="Write study title"
            htmlFor="title"
            error={<MyForm.ErrorMessage name="title"></MyForm.ErrorMessage>}
          >
            <MyForm.Field
              id="create-study-title"
              name="title"
              placeholder="e.g. Spring Boot Deep Dive"
              as={Input_style}
            ></MyForm.Field>
          </FormControl>

          <FormControl
            label="Write study's short description"
            htmlFor="short-description"
            error={
              <MyForm.ErrorMessage name="short-description"></MyForm.ErrorMessage>
            }
          >
            <MyForm.Field
              id="create-study-short-description"
              name="shortDescription"
              placeholder="A brief overview of your study group"
              as={Input_style}
            ></MyForm.Field>
          </FormControl>

          <FormControl
            label="Write study's full description"
            htmlFor="full-description"
            error={
              <MyForm.ErrorMessage name="full-description"></MyForm.ErrorMessage>
            }
          >
            <MyForm.Field
              id="create-study-full-description"
              name="fullDescription"
              placeholder="Detailed information about the study"
              as={MyEditor}
            ></MyForm.Field>
          </FormControl>
          <Button type="submit" size="large" width="100%">Create Study</Button>
        </MyForm.Form>
      </S.CreateStudy_Main_style>
      <S.Study_Image_style>
        {img ? (
          <img src={img} alt="Study Preview" />
        ) : (
          <div style={{ width: "240px", height: "240px", background: "#f8fafc", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1" }}>
            No Image Selected
          </div>
        )}
        <figcaption>Study Banner</figcaption>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="study_img"
          onChange={onChange}
        ></input>
      </S.Study_Image_style>
    </S.Grid_Container_style>
  );
};

export default CreateStudy_Main;
