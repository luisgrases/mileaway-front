import React from "react";
import { Button as ButtonMui } from "react-native-paper";

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  mode?: "contained" | "text" | "outlined";
};

export const Button: React.FC<Props> = (props) => {
  return <ButtonMui uppercase={false} {...props} />;
};
