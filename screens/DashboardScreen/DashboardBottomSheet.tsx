import {
  BottomSheet,
  Caption,
  Card,
  Content,
  Divider,
  EmptyStreet,
  Flexbox,
  List,
  Text,
  Title,
  Toggle,
} from "components";
import { ScrollView } from "react-native";
import { Spinner } from "@ui-kitten/components";
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

  return (
    <BottomSheet
      snapPoints={[450, "85%"]}
      renderContent={() => (
        <>
          <Content>
            <Title>People</Title>
          </Content>
          <Divider />
          <Content>
            <Card appearance="outline" style={{ marginTop: 20 }}>
              <Flexbox direction="column">
                <Flexbox align="center" justify="space-between">
                  <Flexbox direction="column">
                    <Text>Share My Location</Text>
                    <Text style={{ marginTop: 3 }}>1 Mile Radius</Text>
                  </Flexbox>
                  <Toggle
                    checked={isSharingLocation}
                    onChange={(isChecked) => onLocationSharingChange(isChecked)}
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
                  <Caption>
                    You are currently sharing your location. Once any of your
                    friends are nearby, they will appear below. At the same
                    time, you will appear at their list of friends nearby.{" "}
                    <Caption>
                      The exact location of either party will never be shared.
                    </Caption>
                  </Caption>
                ) : (
                  <Caption>
                    {" "}
                    You are currently not sharing your location. No one can see
                    you and you can see no one.
                  </Caption>
                )}
              </Flexbox>
            </Card>
          </Content>
          <ScrollView>
            <Content>
              {isSharingLocation && isLoading && (
                <Flexbox justify="center" align="center">
                  <Spinner />
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
