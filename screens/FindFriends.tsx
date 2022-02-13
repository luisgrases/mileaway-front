import React, { useState } from "react";
import {
  Content,
  ActivityIndicator,
  Flexbox,
  Button,
  List,
  IconButton,
  Searchbar,
  Title,
} from "components";
import { SafeAreaView, ScrollView } from "react-native";
import { useDebounce } from "use-debounce";
import { SearchFriends } from "components/SearchFriends";
import { useFriends } from "modules/friends";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const FindFriends = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchValue, setSearchValue] = useState("");
  const [value] = useDebounce(searchValue, 400);

  const { data: results, isLoading } = useFriends({}, { enabled: !!value });

  return (
    <SafeAreaView>
      <Content>
        <Flexbox align="center">
          <IconButton
            onPress={() => navigation.pop()}
            icon="arrow-left"
            style={{ marginRight: 10 }}
          />
          <Title>Add Friends</Title>
        </Flexbox>
        <Searchbar
          onChangeText={(value) => setSearchValue(value)}
          style={{ marginTop: 10 }}
          autoCapitalize="none"
          value={searchValue}
          autoCorrect={false}
          placeholder="Search"
        />

        <ScrollView style={{ marginTop: 20, height: "100%" }}>
          {isLoading && (
            <Flexbox justify="center" align="center">
              <ActivityIndicator />
            </Flexbox>
          )}

          {!isLoading && !results && (
            <Flexbox align="center" justify="center" direction="column">
              <SearchFriends height="200" />
            </Flexbox>
          )}

          <List.Section>
            {results?.map((item) => (
              <List.Item
                title={item?.username}
                description="Last time online: 12 minutes ago"
                right={() => {
                  return (
                    <Button onPress={() => console.log("hello")}>Add</Button>
                  );
                }}
              />
            ))}
          </List.Section>
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};
