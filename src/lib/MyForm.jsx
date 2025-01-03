import React, { Component } from "react";

export const useForm = ({ initialValue, validate, onSubmit }) => {
  const [values, setValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (e, delta, source, editor) => {
    if (e.target === undefined) {
      const text = editor.getText().replace(/\n$/, "");
      const html = editor.getHTML();
      if (source === "api") {
        return; // to prevent infitie loop when SetValues triggered
      }
      setValues({
        ...values,
        fullDescription: html,
        fullDescriptionText: text,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleBlur = (e, source, editor) => {
    if (e.target === undefined) {
    } else {
      setTouched({
        ...touched,
        [e.target.name]: true,
      });
    }
  };
  const handleFocus = (e, source, editor) => {
    if (e.target === undefined) {
    } else {
      setTouched({
        ...touched,
        [e.target.name]: true,
      });
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const nextTouched = Object.keys(values).reduce((touched, field) => {
      touched[field] = true;
      return touched;
    }, {});
    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    onSubmit(values);
  };


  const getFieldProps = (name) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onFocus = handleFocus;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onFocus,
      onChange,
    };
  };

  React.useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = React.createContext({});
formContext.displayName = "FormContext";

export const Form = ({ id, style, children, ...rest }) => {
  const formValue = useForm(rest);
  return (
    <formContext.Provider value={formValue}>
      <form style={style} id={id} noValidate onSubmit={formValue.handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};

export const Field = ({ as = "input", children, ...rest }) => {
  const { getFieldProps } = React.useContext(formContext);
  return React.createElement(
    as,
    { ...getFieldProps(rest.name), ...rest },
    children
  );
};

export const ErrorMessage = ({ name }) => {
  const { touched, errors } = React.useContext(formContext);
  if (!touched[name] || !errors[name]) return null;
  return <span>{errors[name]}</span>;
};
