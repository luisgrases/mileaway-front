import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "screens/NotFoundScreen";
import { LoginScreen } from "screens/LoginScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import BottomTabNavigator from "navigation/BottomTabNavigator";
import { OnboardingNavigator } from "navigation/OnboardingNavigator";
import { FindFriends } from "screens/FindFriends";
import { useAuthenticated } from "modules/auth/useAuthenticated";
import { useCurrentUser } from "modules/users";

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
  Onboarding: undefined;
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootScreens>();

function RootNavigator() {
  const { isAuthenticated } = useAuthenticated();

  const { data: currentUser } = useCurrentUser();

  console.log("currentUser", currentUser);

  const hasCompletedOnboarding = !!currentUser?.username;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && !hasCompletedOnboarding && (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        </>
      )}
      {isAuthenticated && hasCompletedOnboarding && (
        <>
          <Stack.Screen name="Authenticated" component={BottomTabNavigator} />
          <Stack.Screen
            name="FindFriendsScreen"
            component={FindFriends}
            options={{ headerShown: false }}
          />
        </>
      )}

      {!isAuthenticated && (
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
