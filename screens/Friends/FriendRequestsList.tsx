import { Text, Button, List, useTheme, ActivityIndicator } from "components";

import { ScrollView } from "react-native";
import * as React from "react";
import { useFriendRequests } from "modules/friendRequests";
import { useCurrentUser } from "modules/users";

export const FriendRequestList = () => {
  const theme = useTheme();

  const handleAcceptFriendRequest = () => {
    console.log("accepted");
  };

  const { data: currentUser, isLoading } = useCurrentUser();

  console.log("currentUser", currentUser);

  return (
    <ScrollView style={{ height: "100%" }}>
      <List.Section>
        <List.Subheader>Friend Requests</List.Subheader>
        {currentUser!.requestsReceived?.filter((r) => !r.accepted).length ===
          0 && <Text>Nothing new!</Text>}
        {isLoading && <ActivityIndicator />}
        {currentUser!.requestsReceived
          ?.filter((r) => !r.accepted)
          .map((friendRequest) => (
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
