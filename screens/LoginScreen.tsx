import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button, Content, Title } from "components";
import { StackScreenProps } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { GOOGLE_GUID_EXPO_GO_DEVELOPMENT } from "globals";
import { useLogin } from "modules/auth";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }: StackScreenProps<any>) => {
  const {
    mutateAsync: login,
    data: mileawayLoginResponse,
    isSuccess,
  } = useLogin();
  const [request, googleLoginResponse, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: GOOGLE_GUID_EXPO_GO_DEVELOPMENT,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (googleLoginResponse?.type === "success") {
      const {
        params: { id_token: idToken },
      } = googleLoginResponse;

      login({ googleIdToken: idToken });
    }
  }, [googleLoginResponse]);

  const handleLoginClick = async () => {
    await promptAsync();
    // navigation.replace("Root");
  };

  const fakeLogin = () => {};

  return (
    <SafeAreaView>
      <Content>
        <Title>Mileaway</Title>
        <Button icon="google" mode="contained" onPress={handleLoginClick}>
          Continue with Google
        </Button>
      </Content>
    </SafeAreaView>
  );
};
