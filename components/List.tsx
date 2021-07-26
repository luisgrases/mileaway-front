import React from "react";
import {
  List as UIKittenList,
  ListProps,
  Spinner,
} from "@ui-kitten/components";
import { View } from "./View";
import { ListItem } from "./ListItem";
import { Flexbox } from "components/Flexbox";

export const List = ({ style, data, isLoading, ...rest }: ListProps) => {
  if (isLoading) {
    return (
      <Flexbox justify="center" align="center">
        <Spinner />
      </Flexbox>
    );
  }

  if (data && data.length === 0) {
    return <ListItem title="No results found" />;
  }

  return (
    <UIKittenList
      ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
      style={{ backgroundColor: "transparent", ...style }}
      data={data}
      {...rest}
    />
  );
};
