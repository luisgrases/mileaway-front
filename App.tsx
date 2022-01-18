import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import { Navigation } from "./navigation/Navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const queryClient = new QueryClient();

  if (!isLoadingComplete) {
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
