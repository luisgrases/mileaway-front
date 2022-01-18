import React from "react";
import { SafeAreaView } from "react-native";
import { Content, Button, Flexbox, Title, Text, List } from "components";
import { Card } from "@ui-kitten/components";

export const Settings = () => {
  return (
    <SafeAreaView>
      <Content>
        <Title style={{ marginBottom: 20 }}>Profile</Title>

        <Card>
          <Flexbox>
            <Text>Username:</Text>

            <Text style={{ marginLeft: 5 }}>luisgrases</Text>
          </Flexbox>
        </Card>

        <List.Item
          title="Terms and Conditions"
          onPress={() => console.log("hello")}
        />

        <Button style={{ marginTop: 200 }}>Logout</Button>
      </Content>
    </SafeAreaView>
  );
};
