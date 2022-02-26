import {
  ActivityIndicator,
  BottomSheet,
  Paragraph,
  Card,
  Content,
  Divider,
  EmptyStreet,
  Flexbox,
  List,
  Text,
  Title,
  Switch,
  Subheading,
  useTheme,
} from "components";
import { ScrollView } from "react-native";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useFriends } from "modules/friends";

type Props = {
  isSharingLocation: boolean;
  onLocationSharingChange: (value: boolean) => void;
};

export const DashboardBottomSheet: React.FC<Props> = ({
  isSharingLocation,
  onLocationSharingChange,
}) => {
  const { data: friends, isLoading } = useFriends();
  const theme = useTheme();

  return (
    <BottomSheet
      snapPoints={[450, "85%"]}
      renderContent={() => (
        <>
          <Content>
            <Title>People Nearby</Title>
          </Content>
          <Divider />
          <Content>
            <Card mode="outlined" style={{ marginTop: 20 }}>
              <Card.Content>
                <Flexbox direction="column">
                  <Flexbox align="center" justify="space-between">
                    <Flexbox direction="column">
                      <Subheading>Share My Location</Subheading>
                      <Paragraph
                        style={{ marginTop: 3, color: theme.colors.backdrop }}
                      >
                        1 Mile Radius
                      </Paragraph>
                    </Flexbox>
                    <Switch
                      value={isSharingLocation}
                      onValueChange={(isChecked) =>
                        onLocationSharingChange(isChecked)
                      }
                    />
                  </Flexbox>

                  <Divider
                    style={{
                      alignSelf: "stretch",
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  />

                  {isSharingLocation ? (
                    <Paragraph>
                      You are currently sharing your location. Once any of your
                      friends are nearby, they will appear below. At the same
                      time, you will appear at their list of friends nearby.{" "}
                      <Paragraph>
                        The exact location of either party will never be shared.
                      </Paragraph>
                    </Paragraph>
                  ) : (
                    <Paragraph>
                      {" "}
                      You are currently not sharing your location. No one can
                      see you and you can see no one.
                    </Paragraph>
                  )}
                </Flexbox>
              </Card.Content>
            </Card>
          </Content>
          <ScrollView>
            <Content>
              {isSharingLocation && isLoading && (
                <Flexbox justify="center" align="center">
                  <ActivityIndicator />
                </Flexbox>
              )}
              {isSharingLocation && friends && friends.length == 0 && (
                <Flexbox direction="column" align="center">
                  <EmptyStreet />
                  <Text>Nobody around</Text>
                  <Text style={{ marginTop: 10 }}>
                    Once any of your contacts is nearby, they will appear here.
                  </Text>
                </Flexbox>
              )}

              {isSharingLocation &&
                friends &&
                friends.length > 0 &&
                friends.map((friend) => (
                  <List.Item
                    disabled
                    title={friend.username}
                    description={`Last seen nearby: ${formatDistanceToNow(
                      new Date(friend.lastSeen)
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
