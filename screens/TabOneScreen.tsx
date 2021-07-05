import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import EditScreenInfo from "components/EditScreenInfo";
import { useMockSendRequest } from "hooks/useMockSendRequest";

import { Text, View } from "components/Themed";

export default function TabOneScreen() {
  const [send, { response, error }] = useMockSendRequest([
    { id: 1, username: "juangra" },
    { id: 2, username: "pedrogra" },
  ]);

  useEffect(() => {
    send();
  }, []);

  const renderItem = ({ item }: { item: { id: number; username: string } }) => (
    <Item title={item.username} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return String(item.id);
        }}
      />
    </SafeAreaView>
  );
}

const Item = ({ title }: { title: string }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
