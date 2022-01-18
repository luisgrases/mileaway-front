import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import { FriendsNavigator } from "./FriendsNavigator";

import { Icon, IconProps } from "@ui-kitten/components";
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
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{ activeTintColor: Colors["light"].primary }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="navigation-2-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Friends"
        component={FriendsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings-2-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: IconProps["name"]; color: string }) {
  return (
    <Icon
      style={{ width: 30, height: 30 }}
      fill={props.color}
      name={props.name}
    />
  );
}
