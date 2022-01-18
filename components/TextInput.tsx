import React from "react";
import { TextInput as TextInputMui } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

type Props = Omit<TextInputProps, "theme">;

export const TextInput = ({ mode = "outlined", ...rest }: Props) => {
  return <TextInputMui {...rest} mode={mode} />;
};
