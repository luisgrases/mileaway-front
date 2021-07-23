/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { DashboardScreen } from "screens/DashboardScreen";
import { Friends } from "screens/Friends";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Text } from "react-native";
import {
  Icon,
  IconProps,
  IconRegistry,
  Toggle,
  useTheme,
} from "@ui-kitten/components";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{ activeTintColor: Colors["light"].primary }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="navigation-2-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Friends"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-outline" color={color} />
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: false,
          headerRight: () => (
            <Toggle>
              {(evaProps) => <Text {...evaProps}>Not Sharing</Text>}
            </Toggle>
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={Friends}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
