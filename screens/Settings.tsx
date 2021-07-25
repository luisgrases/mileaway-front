import React from "react";
import { SafeAreaView } from "react-native";
import { Content, Button, Flexbox, Header, Text, ListItem } from "components";
import { Card } from "@ui-kitten/components";

export const Settings = () => {
  return (
    <SafeAreaView>
      <Content>
        <Header style={{ marginBottom: 20 }} level={3}>
          Profile
        </Header>

        <Card>
          <Flexbox>
            <Text weight="medium">Username:</Text>

            <Text style={{ marginLeft: 5 }} tag="span">
              luisgrases
            </Text>
          </Flexbox>
        </Card>

        <ListItem
          title="Terms and Conditions"
          onPress={() => console.log("hello")}
        />

        <Button appearance="outline" status="danger" style={{ marginTop: 200 }}>
          Logout
        </Button>
      </Content>
    </SafeAreaView>
  );
};
