import { Text, Button, List, useTheme, ActivityIndicator } from "components";

import { ScrollView } from "react-native";
import * as React from "react";
import { useFriendRequests } from "modules/friendRequests";
import { useCurrentUser } from "modules/users";
import { useAcceptFriendRequest } from "modules/friendRequests/useAcceptFriendRequest";
import { useDeleteFriendRequest } from "modules/friendRequests/useDeleteFriendRequest";

export const FriendRequestList = () => {
  const theme = useTheme();
  const {
    mutateAsync: acceptFriendRequest,
    isLoading: isAcceptingFriendRequest,
  } = useAcceptFriendRequest();

  const {
    mutateAsync: deleteFriendRequest,
    isLoading: isDeletingFriendRequest,
  } = useDeleteFriendRequest();

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
                  <Button
                    mode="contained"
                    loading={isAcceptingFriendRequest}
                    onPress={() =>
                      acceptFriendRequest({ id: friendRequest.id })
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    style={{ marginLeft: 5 }}
                    loading={isDeletingFriendRequest}
                    onPress={() =>
                      deleteFriendRequest({ id: friendRequest.id })
                    }
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
