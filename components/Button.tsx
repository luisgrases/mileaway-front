import React from "react";
import { Button as ButtonMui } from "react-native-paper";

type Props = typeof ButtonMui;

export const Button: Props = (props) => {
  return <ButtonMui uppercase={false} {...props} />;
};
