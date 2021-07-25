import React from "react";
import { View, Text, Content, Header, Flexbox } from "components";
import { SafeAreaView } from "react-native";
import { Icon, Input } from "@ui-kitten/components";

export const FindFriends = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Content>
        <Flexbox>
          <Icon
            onPress={() => navigation.pop()}
            name="arrow-back-outline"
            fill="black"
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Header level={3}>Add Friends</Header>
        </Flexbox>
        <Input
          style={{ marginTop: 10 }}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
        />
      </Content>
    </SafeAreaView>
  );
};
