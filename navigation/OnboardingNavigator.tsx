import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { SetUsernameScreen } from "screens/SetUsernameScreen";

type Screens = {
  SetUsername: undefined;
};

const OnboardingStack = createStackNavigator<Screens>();

export const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="SetUsername"
        component={SetUsernameScreen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
};
