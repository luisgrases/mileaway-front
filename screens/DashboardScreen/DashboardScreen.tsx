import React, { useEffect, useRef, useState } from "react";
import {
  Flexbox,
  Content,
  BottomSheet,
  Card,
  Divider,
  List,
  ListItem,
  Text,
  useTheme,
  Toggle,
  SafeAreaView,
  View,
} from "components";

import * as Location from "expo-location";
import { formatDistanceToNow } from "date-fns";
import { useMockSendRequest } from "hooks/useMockSendRequest";
import { DashboardMap } from "screens/DashboardScreen/DashboardMap";

const FAKE_LOCATION = {
  lat: 9.931423120648843,
  lon: -84.14629818877998,
};

export function DashboardScreen() {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000 },
        (location) => {
          setLocation(location);
        }
      );
    })();
  }, []);

  const [isSharingLocation, setIsSharingLocation] = useState(true);

  useEffect(() => {
    send();
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { id: number; username: string; lastSeen: string };
  }) => (
    <ListItem
      style={{
        paddingLeft: 22,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme["border-basic-color-4"],
      }}
      title={() => <Text weight="medium">{item.username}</Text>}
      description={() => (
        <Text
          style={{ marginTop: 3 }}
          size="small"
          appearance="info"
        >{`Last seen nearby: ${formatDistanceToNow(
          new Date(item.lastSeen)
        )} ago`}</Text>
      )}
    />
  );

  return (
    <>
      <SafeAreaView>
        <DashboardMap
          isSharingLocation={isSharingLocation}
          lat={FAKE_LOCATION.lat}
          lon={FAKE_LOCATION.lon}
        />
      </SafeAreaView>
      <BottomSheet
        snapPoints={[450, "85%"]}
        renderContent={() => (
          <>
            <Content>
              <Text size="large" weight="bold">
                People
              </Text>
            </Content>
            <Divider />
            <Content>
              <Card appearance="outline" style={{ marginTop: 20 }}>
                <Flexbox direction="column">
                  <Flexbox align="center" justify="space-between">
                    <Flexbox direction="column">
                      <Text>Share My Location</Text>
                      <Text
                        size="small"
                        appearance="info"
                        style={{ marginTop: 3 }}
                      >
                        1 Mile Radius
                      </Text>
                    </Flexbox>
                    <Toggle
                      checked={isSharingLocation}
                      onChange={(isChecked) => setIsSharingLocation(isChecked)}
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
                    <Text size="small" appearance="info">
                      You are currently sharing your location. Once any of your
                      friends are nearby, they will appear below. At the same
                      time, you will appear at their list of friends nearby.{" "}
                      <Text size="small" appearance="info" weight="medium">
                        The exact location of either party will never be shared.
                      </Text>
                    </Text>
                  ) : (
                    <Text size="small" appearance="info">
                      {" "}
                      You are currently not sharing your location. No one can
                      see you and you can see no one.
                    </Text>
                  )}
                </Flexbox>
              </Card>

              <List
                style={{
                  marginTop: 20,
                  backgroundColor: "transparent",
                  height: "100%",
                }}
                data={response}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
                keyExtractor={(item) => {
                  return String(item.id);
                }}
              />
            </Content>
          </>
        )}
      />
    </>
  );
}
