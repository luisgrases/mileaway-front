import { View } from "./View";
import React from "react";

export const Content: React.FC = ({ children }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "transparent",
      }}
    >
      {children}
    </View>
  );
};
