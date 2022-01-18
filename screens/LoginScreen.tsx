import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button, Title } from "components";
import { StackScreenProps } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
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
      <Title>Login Screen!</Title>
      <Button onPress={fakeLogin}>Login</Button>
    </SafeAreaView>
  );
};
