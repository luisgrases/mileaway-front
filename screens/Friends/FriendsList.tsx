import { Button, List } from "components";
import * as React from "react";
import { useFriends } from "modules/friends";
import { ActionSheetIOS } from "react-native";
import { Friend } from "Types";

export const FriendsList = () => {
  const { data: friends } = useFriends();

  console.log("frien", friends);

  const handleDeleteFriendPress = (friend: Friend) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Remove ${friend.username}?`,
        options: ["Cancel", "Remove"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
        }
      }
    );
  };

  return (
    <List.Section>
      <List.Subheader>Friends</List.Subheader>
      {friends?.map((friend) => (
        <List.Item
          title={friend?.username}
          right={() => {
            return (
              <Button onPress={() => handleDeleteFriendPress(friend)}>
                Remove
              </Button>
            );
          }}
        />
      ))}
    </List.Section>
  );
};
