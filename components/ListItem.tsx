import React from "react";
import {
  ListItem as UIKittenListItem,
  ListItemProps,
} from "@ui-kitten/components";
import { Text } from "./Text";
import { useTheme } from "./useTheme";

export const ListItem = (props: ListItemProps) => {
  const theme = useTheme();

  return (
    <UIKittenListItem
      disabled
      style={{
        paddingLeft: 22,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme["border-basic-color-4"],
      }}
      title={() => <Text weight="medium">{props.title}</Text>}
      description={() => (
        <Text style={{ marginTop: 3 }} size="small" appearance="info">
          {props.description}
        </Text>
      )}
      {...props}
    />
  );
};
