import { Button, List } from "components";
import { FriendsList } from "screens/Friends/FriendsList";
import { ScrollView } from "react-native";
import * as React from "react";
import { useFriendRequests } from "modules/friendRequests";

export const FriendRequestList = () => {
  const { data: friendRequests } = useFriendRequests();

  const handleAcceptFriendRequest = () => {
    console.log("accepted");
  };

  return (
    <ScrollView style={{ height: "100%" }}>
      <List.Section>
        <List.Subheader>Friend Requests</List.Subheader>
        {friendRequests?.map((friendRequest) => (
          <List.Item
            title={friendRequest.from.username}
            right={() => (
              <>
                <Button onPress={handleAcceptFriendRequest}>Accept</Button>
                <Button onPress={handleAcceptFriendRequest}>Reject</Button>
              </>
            )}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};
