import { createStackNavigator } from "@react-navigation/stack";
import { Friends } from "screens/Friends/Friends";
import * as React from "react";
import { FindFriends } from "screens/FindFriends";

type Screens = {
  FriendsScreen: undefined;
  FindFriendsScreen: undefined;
};

const FriendsStack = createStackNavigator<Screens>();

export const FriendsNavigator = () => {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen
        name="FriendsScreen"
        component={Friends}
        options={{ headerShown: false }}
      />
      <FriendsStack.Screen
        name="FindFriendsScreen"
        component={FindFriends}
        options={{ headerShown: false }}
      />
    </FriendsStack.Navigator>
  );
};
