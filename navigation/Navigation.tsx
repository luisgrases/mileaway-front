import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "screens/NotFoundScreen";
import { LoginScreen } from "screens/LoginScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import BottomTabNavigator from "navigation/BottomTabNavigator";
import { FindFriends } from "screens/FindFriends";
import { useAuthenticated } from "modules/auth/useAuthenticated";

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

export const Navigation = () => {
  return (
    <>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={CombinedDefaultTheme}
        >
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

type RootScreens = {
  Login: undefined;
  Authenticated: undefined;
  NotFound: undefined;
  FindFriendsScreen: undefined;
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootScreens>();

function RootNavigator() {
  const { isAuthenticated } = useAuthenticated();
  console.log("IsAuthenticaedl", isAuthenticated);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Authenticated" component={BottomTabNavigator} />
          <Stack.Screen
            name="FindFriendsScreen"
            component={FindFriends}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
