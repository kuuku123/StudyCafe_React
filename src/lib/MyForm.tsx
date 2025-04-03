import React, { ReactNode } from "react";
import { CSSProperties } from "styled-components";

interface UseFormOptions<T> {
  initialValue: T;
  validate: (values: T) => Record<string, any>;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValue,
  validate,
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = React.useState<T>(initialValue);
  const [errors, setErrors] = React.useState<Record<string, any>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    delta?: any,
    source?: any,
    editor?: any
  ) => {
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

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement> | any,
    source?: any,
    editor?: any
  ) => {
    if (e.target === undefined) {
    } else {
      setTouched({
        ...touched,
        [e.target.name]: true,
      });
    }
  };
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement> | any,
    source?: any,
    editor?: any
  ) => {
    if (e.target === undefined) {
    } else {
      setTouched({
        ...touched,
        [e.target.name]: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextTouched = Object.keys(values).reduce(
      (touched: Record<string, boolean>, field) => {
        touched[field] = true;
        return touched;
      },
      {}
    );
    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    onSubmit(values);
  };

  const getFieldProps = (name: keyof T & string) => {
    const value = values[name];

    return {
      name,
      value,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleChange,
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

// Define FormProps to include both useForm options and HTML form attributes.
// We use Omit to remove the default onSubmit from HTML attributes since we are overriding it.
interface FormProps<T extends Record<string, any>>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  id: string;
  style?: CSSProperties;
  children: ReactNode;
  initialValue: T;
  validate: (values: T) => Record<string, any>;
  onSubmit: (values: T) => void;
}

interface FormContextType {
  values: any;
  errors: Record<string, any>;
  touched: Record<string, boolean>;
  handleBlur: (e: any, source?: any, editor?: any) => void;
  handleChange: (e: any, delta?: any, source?: any, editor?: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {
    name: string;
    value: any;
    onBlur: (e: any, source?: any, editor?: any) => void;
    onFocus: (e: any, source?: any, editor?: any) => void;
    onChange: (e: any, delta?: any, source?: any, editor?: any) => void;
  };
}

export const formContext = React.createContext<FormContextType | null>(null);
formContext.displayName = "FormContext";

// Now the Form component is generic and receives both the useForm options and the standard form props.
export function Form<T extends Record<string, any>>({
  id,
  style,
  children,
  initialValue,
  validate,
  onSubmit,
  ...rest
}: FormProps<T>) {
  // Pass only the useForm options to useForm
  const formValue = useForm({ initialValue, validate, onSubmit });
  return (
    <formContext.Provider value={formValue}>
      <form
        style={style}
        id={id}
        noValidate
        onSubmit={formValue.handleSubmit}
        {...rest} // Spread the remaining HTML form attributes here
      >
        {children}
      </form>
    </formContext.Provider>
  );
}

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = Props & { as?: C } & Omit<React.ComponentPropsWithoutRef<C>, keyof Props>;

interface BaseFieldProps {
  name: string;
}

export type FieldProps<C extends React.ElementType = "input"> =
  PolymorphicComponentProps<C, BaseFieldProps>;

// Make Field a generic component:
export const Field = <C extends React.ElementType = "input">({
  as,
  name,
  ...rest
}: FieldProps<C>) => {
  const Component = as || "input";
  const { getFieldProps } = React.useContext(formContext)!;
  return React.createElement(
    Component,
    { ...getFieldProps(name), ...rest },
    rest.children
  );
};

export const ErrorMessage = ({ name }: { name: string }) => {
  const { touched, errors } = React.useContext(formContext)!;
  if (!touched[name] || !errors[name]) return null;
  return <span>{errors[name]}</span>;
};
