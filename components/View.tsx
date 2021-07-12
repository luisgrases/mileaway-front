import React from "react";
import { ViewProps } from "react-native";
import { View as NativeView } from "components/Themed";

export const View: React.FC<ViewProps> = ({ children, style }) => {
  return (
    <NativeView style={[{ backgroundColor: "transparent" }, style]}>
      {children}
    </NativeView>
  );
};
