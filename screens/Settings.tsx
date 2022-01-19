import React from "react";
import { SafeAreaView } from "react-native";
import {
  Content,
  Button,
  Divider,
  Title,
  Text,
  List,
  Card,
  Icon,
  useTheme,
} from "components";

export const Settings = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Content>
        <Title style={{ marginBottom: 20 }}>Profile</Title>

        <List.Item
          titleStyle={{ fontWeight: theme.fonts.medium.fontWeight }}
          left={(props) => {
            return <List.Icon {...props} icon="account-circle" />;
          }}
          title="luisgrases"
          onPress={() => console.log("hello")}
        />
        <Divider />

        <List.Item
          title="Terms and Conditions"
          onPress={() => console.log("hello")}
          left={(props) => {
            return <List.Icon {...props} icon="file-document" />;
          }}
          right={(props) => {
            return <List.Icon {...props} icon="chevron-right" />;
          }}
        />

        <Divider />

        <List.Item
          titleStyle={{ color: theme.colors.error }}
          title="Logout"
          left={(props) => {
            return (
              <List.Icon {...props} color={theme.colors.error} icon="logout" />
            );
          }}
          onPress={() => console.log("hello")}
        />
      </Content>
    </SafeAreaView>
  );
};
