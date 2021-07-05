import React from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

export const LoginScreen = ({ navigation }: StackScreenProps<any>) => {
  const login = () => {
    navigation.replace("Root", {
      screen: "TabOne",
    });
  };

  return (
    <SafeAreaView>
      <Text>Login Screen!</Text>
      <Button title="Login" onPress={login} />
    </SafeAreaView>
  );
};
