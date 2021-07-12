import { View } from "./View";
import React from "react";
import { StyleProp } from "react-native";

type Props = {
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  direction?: React.CSSProperties["flexDirection"];
  selfAlign?: React.CSSProperties["alignSelf"];
  style?: StyleProp<any>;
};

export const Flexbox: React.FC<Props> = ({
  children,
  justify = "flex-start",
  align = "flex-start",
  direction = "row",
  selfAlign = "stretch",
  style,
}) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: justify,
        alignItems: align,
        alignSelf: selfAlign,
        flexDirection: direction,
        backgroundColor: "transparent",
        ...style,
      }}
    >
      {children}
    </View>
  );
};
