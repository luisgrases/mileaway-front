import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import { Flexbox, Content, BottomSheet } from "components";
import {
  Card,
  Divider,
  List,
  ListItem,
  Text,
  useTheme,
  Toggle,
} from "@ui-kitten/components";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { formatDistanceToNow } from "date-fns";
import { useMockSendRequest } from "hooks/useMockSendRequest";

import { View } from "components/Themed";

const FAKE_LOCATION = {
  lat: 9.931423120648843,
  lon: -84.14629818877998,
};

export function DashboardScreen() {
  const mapRef = useRef<MapView>(null);
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
      title={item.username}
      description={`Last seen nearby: ${formatDistanceToNow(
        new Date(item.lastSeen)
      )} ago`}
    />
  );

  return (
    <>
      <SafeAreaView>
        <View style={{ position: "relative" }}>
          <MapView
            mapPadding={{ top: 0, right: 0, bottom: 450, left: 0 }}
            ref={mapRef}
            provider="google"
            minZoomLevel={13}
            maxZoomLevel={13}
            scrollEnabled={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            zoomControlEnabled={false}
            rotateEnabled={false}
            region={{
              latitudeDelta: 0,
              longitudeDelta: 0,
              latitude: FAKE_LOCATION.lat,
              longitude: FAKE_LOCATION.lon,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          <Flexbox
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              bottom: 450,
            }}
            align="center"
            justify="center"
          >
            <Flexbox
              style={{
                position: "absolute",
                borderRadius: 320,
                width: 150,
                height: 150,
                backgroundColor: isSharingLocation
                  ? theme["color-primary-default"]
                  : "gray",
                opacity: 0.2,
              }}
              align="center"
              justify="center"
              selfAlign="center"
            />
            <Flexbox
              style={{
                position: "relative",
                borderRadius: 10,
                width: 20,
                height: 20,
                backgroundColor: "white",
                shadowOffset: { width: 0, height: 2 },
                shadowColor: "#000",
                shadowOpacity: 0.2,
                elevation: 5,
              }}
              align="center"
              justify="center"
              selfAlign="center"
            >
              <View
                style={{
                  borderRadius: 10,
                  width: 10,
                  height: 10,
                  backgroundColor: theme["color-primary-default"],
                }}
              />
            </Flexbox>
          </Flexbox>
        </View>
      </SafeAreaView>
      <BottomSheet
        snapPoints={[450, "85%"]}
        renderContent={() => (
          <>
            <Content>
              <Text category="h6">People</Text>
            </Content>
            <Divider style={{ backgroundColor: "lightgray" }} />
            <Content>
              <Card appearance="outline" style={{ marginTop: 20 }}>
                <Flexbox direction="column">
                  <Flexbox align="center" justify="space-between">
                    <Flexbox direction="column">
                      <Text>Share My Location</Text>
                      <Text category="c1" appearance="hint">
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
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />

                  {isSharingLocation ? (
                    <Text category="p2" appearance="hint">
                      You are currently sharing your location. Once any of your
                      friends are nearby, they will appear below. At the same
                      time, you will appear at their list of friends nearby. The
                      exact location of either party will never be shared.
                    </Text>
                  ) : (
                    <Text category="p2" appearance="hint">
                      {" "}
                      You are currently not sharing your location. No one can
                      see you and you can see no one.
                    </Text>
                  )}
                </Flexbox>
              </Card>

              <List
                style={{ marginTop: 20 }}
                data={response}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
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
