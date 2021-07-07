import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import {
  List,
  Divider,
  ListItem,
  Text,
  Card,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { format, formatDistanceToNow } from "date-fns";

import EditScreenInfo from "components/EditScreenInfo";
import { useMockSendRequest } from "hooks/useMockSendRequest";

import { View } from "components/Themed";
import { Flexbox } from "components/Flexbox";

export function DashboardScreen() {
  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
  ]);

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
    <SafeAreaView>
      <Card style={{ backgroundColor: "transparent" }} appearance="outline">
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "transparent",
          }}
        >
          <Icon
            style={{ width: 25, height: 25 }}
            fill="gray"
            name="info-outline"
          />
          <Text category="c2" style={{ marginLeft: 10 }}>
            You are currently sharing your location. Once any of your friends
            are nearby, they will appear on this list. At the same time, you
            will appear at their list of friends nearby. The exact location of
            either party will never be shared.
          </Text>
        </View>
      </Card>
      <List
        data={response}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item) => {
          return String(item.id);
        }}
      />
    </SafeAreaView>
  );
}
