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
  align = "left",
  style,
  ...props
}) => {
  return (
    <NativeText
      style={[
        styles[`appearance--${appearance}`],
        styles[`size--${size}`],
        styles[`align--${align}`],
        styles[`align--${align}`],
        styles[`weight--${weight}`],
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  "align--left": { textAlign: "left" },
  "align--center": { textAlign: "center" },
  "align--right": { textAlign: "right" },
  "appearance--default": { color: "black" },
  "appearance--info": { color: "#8F9BB3" },
  "size--xsmall": { fontSize: 10 },
  "size--small": { fontSize: 12 },
  "size--regular": { fontSize: 14 },
  "size--large": { fontSize: 24 },
  "size--xlarge": { fontSize: 30 },
  "weight--regular": { fontWeight: "400" },
  "weight--medium": { fontWeight: "600" },
  "weight--bold": { fontWeight: "700" },
});
