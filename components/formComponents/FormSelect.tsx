import React, { useState } from "react";
import { useTheme } from "@chakra-ui/react";
import FromWrapper from "./FormWrapper";
import { IFormInputProps } from "../../interface/form";
import ReactSelect, { Props } from "react-select";
import "../../app/globals.css";

interface IFormSelectProps
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[] | any;
  selectProps?: Props;
  onChange?: any;
  onBlur?: any;
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme();

  const [_document, set_document] = useState<Document | null>(null);

  React.useEffect(() => {
    set_document(document);
  }, []);

  const handleChange = (value: any) => {
    onChange && onChange(name, value?.value);
  };
  const handleBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={options.find((item: { value: string }) => item?.value === value)}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        menuPlacement="bottom"
        menuPosition="fixed"
        menuPortalTarget={_document?.querySelector("body")}
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
            height: "auto",
            maxHeight: "none",
            minHeight: "none",
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: "100%",
            minWidth: "272px",
            height: "45px",
            border: isFocused
              ? `1px solid blue`
              : error
              ? `2px solid black`
              : "1px solid #c0bcd7",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            fontSize: ".875rem",
            fontWeight: "500",
            "&:hover": {
              border: `1px solid #cbd5e0`,
            },
            // zIndex: 1,
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
          }),
        }}
        {...selectProps}
      />
      {children}
    </FromWrapper>
  );
};

export default FormSelect;
