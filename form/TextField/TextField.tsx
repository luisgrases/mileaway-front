import React from "react";

import { useFormField, useFormStatus } from "../Form/Form";
import { HelperText, TextInput } from "components";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type TextFieldProps = MergeWithPriority<
  {
    /**
     * Addition info related to the text input: help text, context, etc.
     */
    id?: string;
    info?: React.ReactNode;
    name: string;
    label?: string;
    onBlur?: () => void;
  },
  Omit<TextInputProps, "value" | "onChange" | "theme">
>;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  info,
  label,
  disabled,
  onBlur,
  ...rest
}: TextFieldProps) => {
  const { value, error, touched, setValue, setTouched } = useFormField<
    string | undefined
  >(name);

  const { isSubmitting } = useFormStatus();

  const handleChangeText = (text: string) => {
    setTouched(true);
    setValue(text);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <>
      <TextInput
        disabled={disabled || isSubmitting}
        value={value}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        error={Boolean(touched && error)}
        {...rest}
      />
      <HelperText visible={Boolean(touched && error)} type="error">
        {error}
      </HelperText>
    </>
  );
};
