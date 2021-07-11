import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import {
  List,
  Divider,
  ListItem,
  Text,
  Card,
  Icon,
  Layout,
  Toggle,
} from "@ui-kitten/components";
import MapView from "react-native-maps";
import { BlurView } from "expo-blur";
import { format, formatDistanceToNow } from "date-fns";

import EditScreenInfo from "components/EditScreenInfo";
import { useMockSendRequest } from "hooks/useMockSendRequest";

import { View } from "components/Themed";
import { Header } from "@react-navigation/stack";

export function DashboardScreen() {
  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
  ]);

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
        <View>
          <MapView
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          />
        </View>
      </SafeAreaView>
      <BottomSheet
        snapPoints={[450, "85%"]}
        borderRadius={10}
        renderContent={() => (
          <>
            <View
              style={{
                backgroundColor: "transparent",
                paddingTop: 5,
              }}
            ></View>
            <View
              style={{
                shadowOffset: { width: 0, height: 2 },
                shadowColor: "#000",
                shadowOpacity: 0.2,
                elevation: 5,
                zIndex: 30,
                borderRadius: 20,
              }}
            >
              <CustomBlurView style={{ borderRadius: 20 }}>
                <Flexbox justify="center" style={{ marginTop: 14 }}>
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      width: 30,
                      height: 5,
                      borderRadius: 5,
                    }}
                  ></View>
                </Flexbox>
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
                          onChange={(isChecked) =>
                            setIsSharingLocation(isChecked)
                          }
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
                          You are currently sharing your location. Once any of
                          your friends are nearby, they will appear below. At
                          the same time, you will appear at their list of
                          friends nearby. The exact location of either party
                          will never be shared.
                        </Text>
                      ) : (
                        <Text category="p2" appearance="hint">
                          {" "}
                          You are currently not sharing your location. No one
                          can see you and you can see no one.
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
              </CustomBlurView>
            </View>
          </>
        )}
      />
    </>
  );
}

const CustomBlurView = ({ children, style }) => {
  return (
    <View style={{ overflow: "hidden", ...style }}>
      <BlurView style={{ height: "100%" }} intensity={85} tint="light">
        <BlurView style={{ height: "100%" }} intensity={85} tint="light">
          {children}
        </BlurView>
      </BlurView>
    </View>
  );
};

const Content = ({ children }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "transparent",
      }}
    >
      {children}
    </View>
  );
};

const Flexbox = ({
  children,
  justify = "flex-start",
  align = "flex-start",
  direction = "row",
  style,
}) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: justify,
        alignItems: align,
        alignSelf: "stretch",
        flexDirection: direction,
        backgroundColor: "transparent",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor: "#0000", // invisible color
  },
});
