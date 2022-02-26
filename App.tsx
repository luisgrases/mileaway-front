import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import * as SplashScreen from "expo-splash-screen";

import useCachedResources from "./hooks/useCachedResources";
import { Navigation } from "./navigation/Navigation";
import { useAuthenticated } from "modules/auth/useAuthenticated";
import { AuthenticationProvider } from "modules/auth/AuthenticationProvider";
import { useCurrentUser } from "modules/users";
import { View } from "components";
import { Text } from "react-native";

function AppContent() {
  const isLoadingComplete = useCachedResources();

  const [appIsReady, setAppIsReady] = useState(false);
  const { isAuthenticated } = useAuthenticated();
  useCurrentUser();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true || isAuthenticated === false) {
      setAppIsReady(true);
    }
  }, [isAuthenticated]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!isLoadingComplete || !appIsReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <AppContent />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default App;
