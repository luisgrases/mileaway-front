import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Content, Text, List, ListItem } from "components";
import { ScrollView } from "react-native";

export const Friends = () => {
  return (
    <SafeAreaView>
      <Content>
        <Text size="large" weight="bold">
          People
        </Text>
        <List
          style={{ height: "100%" }}
          data={[1, 3, 4]}
          renderItem={() => (
            <ListItem
              title="hello"
              description="Last time online: 12 minutes ago"
            />
          )}
        />
      </Content>
    </SafeAreaView>
  );
};

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
