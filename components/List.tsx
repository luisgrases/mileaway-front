import React from "react";
import { List as UIKittenList, ListProps } from "@ui-kitten/components";
import { View } from "./View";

export const List = ({ style, ...rest }: ListProps) => {
  return (
    <UIKittenList
      ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
      style={{ backgroundColor: "transparent", ...style }}
      {...rest}
    />
  );
};
