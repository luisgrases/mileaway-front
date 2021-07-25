import * as React from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  Content,
  Header,
  List,
  ListItem,
  Button,
  Flexbox,
  useTheme,
  View,
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
        <Flexbox justify="space-between" align="center">
          <Header level={3}>People</Header>
          <Icon
            onPress={() => navigation.push("FindFriendsScreen")}
            style={{ width: 25, height: 25 }}
            fill="black"
            name="plus-circle-outline"
          />
        </Flexbox>

        <ScrollView style={{ height: "100%" }}>
          <Header level={5} style={{ marginBottom: 10, marginTop: 10 }}>
            Friend Requests
          </Header>
          {isLoading && (
            <Flexbox justify="center" align="center">
              <Spinner />
            </Flexbox>
          )}

          <List
            data={response}
            renderItem={(item) => (
              <ListItem
                title={item.item.username}
                description="Last time online: 12 minutes ago"
                accessoryRight={() => {
                  return (
                    <Button
                      status="primary"
                      appearance="outline"
                      size="tiny"
                      onPress={(hey) => onDeleteFriendPress(item.item)}
                    >
                      Accept
                    </Button>
                  );
                }}
              />
            )}
          />

          <Header level={5} style={{ marginBottom: 10, marginTop: 10 }}>
            Friends
          </Header>
          {isLoading && (
            <Flexbox justify="center" align="center">
              <Spinner />
            </Flexbox>
          )}

          <List
            data={response}
            renderItem={(item) => (
              <ListItem
                title={item.item.username}
                description="Last time online: 12 minutes ago"
                accessoryRight={() => {
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
            )}
          />
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
