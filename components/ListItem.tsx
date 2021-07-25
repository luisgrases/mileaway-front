import React from "react";
import {
  Icon,
  ListItem as UIKittenListItem,
  ListItemProps,
} from "@ui-kitten/components";
import { Text } from "./Text";
import { useTheme } from "./useTheme";

export const ListItem = (props: ListItemProps) => {
  const theme = useTheme();

  return (
    <UIKittenListItem
      style={{
        paddingLeft: 22,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme["border-basic-color-4"],
      }}
      title={
        typeof props.title === "string"
          ? () => <Text weight="medium">{props.title}</Text>
          : props.title
      }
      accessoryRight={
        props.onPress &&
        (() => (
          <Icon
            name="arrow-ios-forward-outline"
            fill="black"
            style={{ width: 25, height: 25 }}
          />
        ))
      }
      description={
        props.description &&
        (() => (
          <Text style={{ marginTop: 3 }} size="small" appearance="info">
            {props.description}
          </Text>
        ))
      }
      {...props}
    />
  );
};
