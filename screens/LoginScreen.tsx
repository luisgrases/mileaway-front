import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import { Button, Text } from "@ui-kitten/components";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { GOOGLE_GUID_EXPO_GO_DEVELOPMENT } from "globals";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }: StackScreenProps<any>) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: GOOGLE_GUID_EXPO_GO_DEVELOPMENT,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      console.log("authentication", params.id_token);
    }
  }, [response]);

  const login = () => {
    promptAsync();
    // navigation.replace("Root");
  };

  const fakeLogin = () => {
    navigation.replace("Authenticated");
  };

  return (
    <SafeAreaView>
      <Text>Login Screen!</Text>
      <Button onPress={fakeLogin}>Login</Button>
    </SafeAreaView>
  );
};
