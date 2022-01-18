import { createStackNavigator } from "@react-navigation/stack";
import { Settings } from "screens/Settings";
import * as React from "react";

type Screens = {
  Profile: undefined;
};

const SettingsStack = createStackNavigator<Screens>();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Profile"
        component={Settings}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};
