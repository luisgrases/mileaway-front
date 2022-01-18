import * as React from "react";
import {
  SafeAreaView,
  Content,
  IconButton,
  Flexbox,
  Title,
  useTheme,
} from "components";
import { ScrollView } from "react-native";
import { FriendsList } from "./FriendsList";
import { FriendRequestList } from "./FriendRequestsList";
import { useNavigation } from "@react-navigation/native";

export const Friends = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Content>
        <Flexbox justify="space-between" align="center">
          <Title>Friends</Title>
          <IconButton
            color={theme.colors.primary}
            icon="account-plus"
            onPress={() => navigation.navigate("FindFriendsScreen")}
          />
        </Flexbox>

        <ScrollView style={{ height: "100%" }}>
          <FriendRequestList />
          <FriendsList />
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};
