import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { FriendsNavigator } from "./FriendsNavigator";

import { Icon } from "components";
import { DashboardNavigator } from "./DashboardNavigator";
import { SettingsNavigator } from "./SettingsNavigator";

type Screens = {
  Dashboard: undefined;
  Friends: undefined;
  Settings: undefined;
};

const BottomTab = createBottomTabNavigator<Screens>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Dashboard">
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={30} name="view-dashboard" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Friends"
        component={FriendsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={30} name="account-group" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={30} name="cog-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
