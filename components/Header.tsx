import React, { createElement } from "react";
import { Text } from "react-native";

import { StyleSheet } from "react-native";

type Props = {
  align?: "left" | "center" | "right";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.AllHTMLAttributes<HTMLElement>;

export const Header: React.FC<Props> = ({
  align = "left",
  className,
  level = 1,
  children,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[styles[`align--${align}`], styles[`level--${level}`], style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  "align--left": { textAlign: "left" },
  "align--center": { textAlign: "center" },
  "align--right": { textAlign: "right" },
  "level--1": { fontSize: 36, fontWeight: "bold" },
  "level--2": { fontSize: 28, fontWeight: "bold" },
  "level--3": { fontSize: 20, fontWeight: "bold" },
  "level--4": { fontSize: 18, fontWeight: "bold" },
  "level--5": {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "rgb(50, 83, 106)",
  },
  "level--6": {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "rgb(22, 45, 61)",
  },
});
