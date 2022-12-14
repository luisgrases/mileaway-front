import React from "react";
import { SafeAreaView } from "react-native";
import { Content, Divider, Title, List, useTheme } from "components";
import { useLogout } from "modules/auth";
import { useCurrentUser } from "modules/users";

export const Settings = () => {
  const { logout } = useLogout();
  const { data: currentUser } = useCurrentUser();

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
          title={currentUser?.username}
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
          onPress={logout}
        />
      </Content>
    </SafeAreaView>
  );
};
