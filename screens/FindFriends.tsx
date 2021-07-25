import React, { useEffect, useState } from "react";
import { Content, Header, Flexbox, List, ListItem, Button } from "components";
import { SafeAreaView, ScrollView } from "react-native";
import { Icon, Input, Spinner } from "@ui-kitten/components";
import { useDebounce } from "use-debounce";
import { useMockSendRequest } from "hooks/useMockSendRequest";
import { SearchFriends } from "components/SearchFriends";

export const FindFriends = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [value] = useDebounce(searchValue, 400);

  const [send, { response, isLoading }] = useMockSendRequest([
    { id: 1, username: "juangra", lastSeen: new Date().toISOString() },
    { id: 2, username: "pedrogra", lastSeen: new Date().toISOString() },
    { id: 3, username: "luisgra", lastSeen: new Date().toISOString() },
  ]);

  console.log("value", value);

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
          onChangeText={(value) => setSearchValue(value)}
          style={{ marginTop: 10 }}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
        />
        <ScrollView style={{ marginTop: 20, height: "100%" }}>
          {isLoading && (
            <Flexbox justify="center" align="center">
              <Spinner />
            </Flexbox>
          )}
          {!isLoading && !response && <SearchFriends width="80%" />}
          <List
            scrollEnabled={false}
            data={response}
            renderItem={(item) => (
              <ListItem
                title={item.item.username}
                description="Last time online: 12 minutes ago"
                accessoryRight={() => {
                  return (
                    <Button status="primary" appearance="outline" size="tiny">
                      Add
                    </Button>
                  );
                }}
              />
            )}
          />
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};
