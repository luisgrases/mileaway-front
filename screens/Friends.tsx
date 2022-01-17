import * as React from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  Content,
  Header,
  ListDeprecated,
  ListItemDeprecated,
  Button,
  Flexbox,
  useTheme,
  View,
  List,
} from "components";
import { ActionSheetIOS } from "react-native";
import { ScrollView } from "react-native";
import { Icon, Spinner } from "@ui-kitten/components";
import { useMockSendRequest } from "hooks/useMockSendRequest";
import { useEffect } from "react";

export const Friends = ({ navigation }) => {
  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
    { id: 3, username: "luisgra", lastSeen: new Date().toISOString() },
  ]);

  useEffect(() => {
    send();
  }, []);

  const onDeleteFriendPress = (friend) => {
    console.log(friend);
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
          console.log("hey");
        }
      }
    );
  };

  console.log("response", response);
  return (
    <SafeAreaView>
      <Content>
        <Flexbox justify="flex-end" align="center">
          <Icon
            onPress={() => navigation.push("FindFriendsScreen")}
            style={{ width: 25, height: 25 }}
            fill="black"
            name="plus-circle-outline"
          />
        </Flexbox>

        <ScrollView style={{ height: "100%" }}>
          <List.Section>
            <List.Subheader>Friend Requests</List.Subheader>
            {response?.map((item) => (
              <List.Item
                title={item?.username}
                description="Last time online: 12 minutes ago"
                right={() => (
                  <>
                    <Button
                      status="primary"
                      appearance="outline"
                      size="tiny"
                      onPress={(hey) => onDeleteFriendPress(item.item)}
                    >
                      Accept
                    </Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      status="danger"
                      appearance="outline"
                      size="tiny"
                      onPress={(hey) => onDeleteFriendPress(item.item)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              />
            ))}
          </List.Section>

          <List.Section>
            <List.Subheader>Friends</List.Subheader>
            {response?.map((item) => (
              <List.Item
                title={item?.username}
                description="Last time online: 12 minutes ago"
                right={() => {
                  return (
                    <Button
                      status="danger"
                      appearance="outline"
                      size="tiny"
                      onPress={(hey) => onDeleteFriendPress(item.item)}
                    >
                      Remove
                    </Button>
                  );
                }}
              />
            ))}
          </List.Section>
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};
