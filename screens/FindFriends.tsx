import React, { useEffect, useState } from "react";
import { Content, Header, Flexbox, List, ListItem, Button } from "components";
import { SafeAreaView, ScrollView } from "react-native";
import { Icon, Input } from "@ui-kitten/components";
import { useDebounce } from "use-debounce";
import { useMockSendRequest } from "hooks/useMockSendRequest";

export const FindFriends = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState();
  const [value] = useDebounce(value, 1000);

  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
    { id: 3, username: "luisgra", lastSeen: new Date().toISOString() },
  ]);

  useEffect(() => {
    if (value) {
      send();
    }
  }, [value]);
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
        <List
          data={response}
          renderItem={(item) => (
            <ListItem
              title={item.item.username}
              description="Last time online: 12 minutes ago"
              accessoryRight={() => {
                return (
                  <Button status="primary" appearance="outline" size="tiny">
                    Accept
                  </Button>
                );
              }}
            />
          )}
        />
      </Content>
    </SafeAreaView>
  );
};
