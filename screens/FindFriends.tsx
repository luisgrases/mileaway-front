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
  Text,
  useTheme,
} from "components";
import { SafeAreaView, ScrollView } from "react-native";
import { useDebounce } from "use-debounce";
import { SearchFriends } from "components/SearchFriends";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useUsers } from "modules/users/useUsers";
import { useCreateFriendRequest } from "modules/friendRequests/useCreateFriendRequest";
import { useDeleteFriendRequest } from "modules/friendRequests/useDeleteFriendRequest";
import { useAcceptFriendRequest } from "modules/friendRequests/useAcceptFriendRequest";

export const FindFriends = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchValue, setSearchValue] = useState("");
  const [value] = useDebounce(searchValue, 400);
  const theme = useTheme();

  const { data: results, isLoading } = useUsers(
    { username: value },
    { enabled: !!value }
  );

  const {
    mutateAsync: createFriendRequest,
    isLoading: isCreatingFriendRequest,
  } = useCreateFriendRequest();

  const {
    mutateAsync: deleteFriendRequest,
    isLoading: isDeletingFriendRequest,
  } = useDeleteFriendRequest();

  const {
    mutateAsync: acceptFriendRequest,
    isLoading: isAcceptingFriendRequest,
  } = useAcceptFriendRequest();

  console.log("usersjuahn", results);

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

          {results && results.length === 0 && (
            <List.Section>
              <List.Item
                title={
                  <Text
                    style={{ color: theme.colors.backdrop }}
                  >{`No results found for ${value}`}</Text>
                }
              />
            </List.Section>
          )}
          {results && results.length > 0 && (
            <List.Section>
              {results.map((user) => (
                <List.Item
                  key={user.username}
                  title={user.username}
                  right={() => {
                    const requestByMe = user.requestsReceived[0];
                    const requestByThem = user.requestsSent[0];

                    if (requestByMe && !requestByMe.accepted) {
                      return (
                        <Button
                          loading={isDeletingFriendRequest}
                          onPress={() =>
                            deleteFriendRequest({ id: requestByMe.id })
                          }
                        >
                          Cancel
                        </Button>
                      );
                    }

                    if (requestByThem && !requestByThem.accepted) {
                      return (
                        <Button
                          loading={isAcceptingFriendRequest}
                          onPress={() =>
                            acceptFriendRequest({ id: requestByThem.id })
                          }
                        >
                          Accept
                        </Button>
                      );
                    }

                    if (!requestByThem && !requestByMe) {
                      return (
                        <Button
                          loading={isCreatingFriendRequest}
                          onPress={() => createFriendRequest({ toId: user.id })}
                        >
                          Send Request
                        </Button>
                      );
                    }
                    return null;
                  }}
                />
              ))}
            </List.Section>
          )}
        </ScrollView>
      </Content>
    </SafeAreaView>
  );
};
