import {
  BottomSheet,
  Content,
  Divider,
  Flexbox,
  List,
  Text,
  Title,
  Switch,
  useTheme,
  View,
} from "components";

import { ScrollView } from "react-native";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import Pulse from "react-native-pulse";
import { useUpdateCurrentUser } from "modules/users/useUpdateCurrentUser";
import { useCurrentUser } from "modules/users";
import { useFriends } from "modules/users/useFriends";
import { Headline } from "react-native-paper";

const POLLING_ENABLED = false

export const DashboardBottomSheet: React.FC = () => {
  const { mutateAsync: updateCurrentUser } = useUpdateCurrentUser();
  const { data: currentUser } = useCurrentUser();
  const theme = useTheme();
  const { data: friends, isLoading } = useFriends(
    { inRange: true },
    { refetchInterval: POLLING_ENABLED ? 5000 : undefined }
  );

  const handleToggleLocationSharing = () => {
    updateCurrentUser({ isSharingLocation: !currentUser!.isSharingLocation });
  };


  return (
    <BottomSheet
      snapPoints={[450, "85%"]}
      renderContent={() => (
        <>
          <Content>
            <Flexbox align="center" justify="space-between">
              <Flexbox direction="column">
                <Title>People Nearby</Title>
                <Text style={{ color: theme.colors.backdrop }}>
                  1 Mile Radius
                </Text>
              </Flexbox>
              <Switch
                value={currentUser!.isSharingLocation}
                onValueChange={handleToggleLocationSharing}
              />
            </Flexbox>
          </Content>
          <Divider />
          {currentUser!.isSharingLocation &&
            (isLoading || (friends && friends.length === 0)) && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 200,
                  left: 0,
                  right: 0,
                }}
              >
                <Pulse
                  color={theme.colors.primary}
                  numPulses={3}
                  diameter={200}
                  speed={20}
                  duration={2000}
                />
              </View>
            )}

          <ScrollView>
            <Content>
              {currentUser!.isSharingLocation &&
                friends &&
                friends.length > 0 &&
                friends.map((friend) => (
                  <List.Item
                    key={friend.id}
                    disabled
                    title={friend.username}
                    description={`Last seen nearby: ${formatDistanceToNow(
                      new Date(friend.locationUpdatedAt)
                    )} ago`}
                  />
                ))}
            </Content>
          </ScrollView>
        </>
      )}
    />
  );
};
