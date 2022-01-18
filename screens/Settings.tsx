import React from "react";
import { SafeAreaView } from "react-native";
import { Content, Button, Flexbox, Title, Text, List, Card } from "components";

export const Settings = () => {
  return (
    <SafeAreaView>
      <Content>
        <Title style={{ marginBottom: 20 }}>Profile</Title>

        <Card mode="outlined">
          <Card.Content>
            <Flexbox>
              <Text>Username:</Text>

              <Text style={{ marginLeft: 5 }}>luisgrases</Text>
            </Flexbox>
          </Card.Content>
        </Card>

        <List.Item
          title="Terms and Conditions"
          onPress={() => console.log("hello")}
        />

        <Button
          onPress={() => console.log("goodbye")}
          style={{ marginTop: 200 }}
        >
          Logout
        </Button>
      </Content>
    </SafeAreaView>
  );
};
