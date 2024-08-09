import React from "react";
import MyEditor from "../../components/Quill-Editor/MyEditor";
import * as S from "./CreateStudyPage_style";
import * as MyForm from "../../lib/MyForm";
import FormControl from "../../components/FomrControl";
const CreateStudy_Main = () => {


  
  
  const handleSubmit = async (createStudyForm) => {
    createStudyForm["profileImage"] = img;
    const raw_response = await fetch("http://localhost:8081/settings/profile", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(createStudyForm),
    });
    const response = await raw_response.json();
    console.log(response);
    if (response.status === "OK") {
      console.log("update ok~");
      navigate("/");
    } else {
      alert("BadRequest");
    }
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  // const input_style = {width: "1200px", height: "40px"}
  const input_style = {
  width: "100vh", // Takes full width of the parent container
  maxWidth: "1200px", // Ensures it doesn't grow larger than 1200px
  height: "40px",
  minWidth: "200px", // Ensures it doesn't shrink too much
};

  const long_description_style = {
  width: "100vh", // Takes full width of the parent container
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
          url: "",
          name: "",
          "short-description":"",
          "long-description":"",
        }}
        validate={validate}
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl
          label="스터디 url을 작성해주세요"
          htmlFor="url"
          error={<MyForm.ErrorMessage name="url"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-url"
            name="url"
            placeholder="write url for your study group"
            style={input_style}
          >
          </MyForm.Field>
        </FormControl>

        <FormControl
          label="스터디 이름을 작성해주세요"
          htmlFor="name"
          error={<MyForm.ErrorMessage name="name"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-name"
            name="name"
            placeholder="write name for your study group"
            style={input_style}
          >
          </MyForm.Field>
        </FormControl>


        <FormControl
          label="스터디 short description을 작성해주세요"
          htmlFor="url"
          error={<MyForm.ErrorMessage name="short-description"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-shrot-description"
            name="short-description"
            placeholder="write short-description for your study group"
            style={input_style}
          >
          </MyForm.Field>
        </FormControl>

        <FormControl
          label="스터디 long-description 을 작성해주세요"
          htmlFor="long-description"
          error={<MyForm.ErrorMessage name="long-description"></MyForm.ErrorMessage>}
        >
          <MyForm.Field
            id="create-study-long-description"
            name="long-description"
            placeholder="write long-description for your study group"
            style={long_description_style}
            // as={<MyEditor></MyEditor>}
          >
          </MyForm.Field>
        </FormControl>
        <button type="submit">저장하기</button>
      </MyForm.Form>
    </S.CreateStudy_Main_style>
  );
};

export default CreateStudy_Main;
