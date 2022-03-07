import { Button, List, useTheme, ActivityIndicator } from "components";

import { ScrollView } from "react-native";
import * as React from "react";
import { useFriendRequests } from "modules/friendRequests";

export const FriendRequestList = () => {
  const theme = useTheme();
  const { data: friendRequests, isLoading } = useFriendRequests();

  const handleAcceptFriendRequest = () => {
    console.log("accepted");
  };

  return (
    <ScrollView style={{ height: "100%" }}>
      <List.Section>
        <List.Subheader>Friend Requests</List.Subheader>
        {isLoading && <ActivityIndicator />}
        {friendRequests?.map((friendRequest) => (
          <List.Item
            key={friendRequest.id}
            title={friendRequest.from.username}
            right={() => (
              <>
                <Button mode="contained" onPress={handleAcceptFriendRequest}>
                  Accept
                </Button>

                <Button
                  style={{ marginLeft: 5 }}
                  onPress={handleAcceptFriendRequest}
                >
                  Reject
                </Button>
              </>
            )}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};
