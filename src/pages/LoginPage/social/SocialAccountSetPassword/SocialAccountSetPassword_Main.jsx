import React from "react";
import * as MyForm from "../../../../lib/MyForm";
import FormControl from "../../../../components/FomrControl";

const SocialAccountSetPassword_Main = () => {
  const onSubmit = async (passwordInfo) => {
    const response = await fetch(`${SERVER_API_URL}/settings/password`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordInfo),
    }
  ).then((res) => {
      console.log(res);
      return res.json();
    });
    handleResopnse(response)
  };

  return (
    <MyForm.Form
      id="social-set-password"
      initialValue={{
        password: "",
      }}
      onSubmit={onSubmit}
    >
      <FormControl
        label="Password"
        htmlFor="password"
        error={<MyForm.ErrorMessage name="password"></MyForm.ErrorMessage>}
      >
        <MyForm.Field
          id="password"
          name="password"
          type="password"
          placeholder="write your password"
        ></MyForm.Field>
      </FormControl>
    </MyForm.Form>
  );
};

export default SocialAccountSetPassword_Main;
