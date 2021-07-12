import React from "react";
import {
  Divider as UIKittenDivider,
  DividerProps,
} from "@ui-kitten/components";

export const Divider: React.FC<DividerProps> = ({ style, ...props }) => {
  return (
    <UIKittenDivider
      style={[{ backgroundColor: "#dbdbdb" }, style]}
      {...props}
    />
  );
};
