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
import { getItemAsync } from "expo-secure-store";

function AppContent() {
  const isLoadingComplete = useCachedResources();
  const queryClient = new QueryClient();

  const [appIsReady, setAppIsReady] = useState(false);
  const { setIsAuthenticated } = useAuthenticated();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      const token = await getItemAsync("session-token");
      setIsAuthenticated(!!token);
      setAppIsReady(true);
    }
    prepare();
  }, []);

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
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}

const App: React.FC = () => {
  return (
    <AuthenticationProvider>
      <AppContent />
    </AuthenticationProvider>
  );
};

export default App;
