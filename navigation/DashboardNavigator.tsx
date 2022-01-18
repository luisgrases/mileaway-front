import { createStackNavigator } from "@react-navigation/stack";
import { DashboardScreen } from "screens/DashboardScreen";
import * as React from "react";

type Screens = {
  DashboardScreen: undefined;
};

const DashboardStack = createStackNavigator<Screens>();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
    </DashboardStack.Navigator>
  );
};
