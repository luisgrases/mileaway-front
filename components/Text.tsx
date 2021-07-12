import React from "react";
import { Text as NativeText, TextProps } from "react-native";

import { StyleSheet } from "react-native";

type Props = {
  align?: "left" | "center" | "right";

  appearance?: "danger" | "default" | "info" | "warning";

  size?: "xlarge" | "large" | "regular" | "small" | "xsmall";

  tag?: "div" | "p" | "span";

  weight?: "bold" | "medium" | "regular";
} & TextProps;

export const Text: React.FC<Props> = ({
  appearance = "default",
  size = "regular",
  weight = "regular",
  style,
  ...props
}) => {
  return (
    <NativeText
      style={[
        styles.text,
        styles[`appearance--${appearance}`],
        styles[`size--${size}`],
        styles[`weight--${weight}`],
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "left" },
  "appearance--default": { color: "black" },
  "appearance--info": { color: "#8F9BB3" },
  "size--xsmall": { fontSize: 12 },
  "size--small": { fontSize: 14 },
  "size--regular": { fontSize: 16 },
  "size--large": { fontSize: 24 },
  "size--xlarge": { fontSize: 30 },
  "weight--regular": { fontWeight: "400" },
  "weight--medium": { fontWeight: "600" },
  "weight--bold": { fontWeight: "700" },
});
