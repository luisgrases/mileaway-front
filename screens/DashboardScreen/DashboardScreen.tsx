import React, { useEffect, useRef, useState } from "react";
import { List, Switch, View, Text, SafeAreaView, Button } from "components";

import { DashboardMap } from "screens/DashboardScreen/DashboardMap";
import { DashboardBottomSheet } from "screens/DashboardScreen/DashboardBottomSheet";
import { useWatchPositionAsync } from "utils/useWatchPositionAsync";
import { useUpdateCurrentUserLocation } from "modules/users/useUpdateCurrentUserLocation";
import { AppState, Linking } from "react-native";

const LOCATION_UPDATES_ENABLED = false;

export function DashboardScreen() {
  const { currentLocation, granted } = useWatchPositionAsync();

  const { mutateAsync: updateCurrentUserLocation } =
    useUpdateCurrentUserLocation();

  useEffect(() => {
    if (currentLocation && LOCATION_UPDATES_ENABLED) {
      updateCurrentUserLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    }
  }, [currentLocation]);

  console.log("vll");

  if (!granted)
    return (
      <>
        <SafeAreaView>
          <Text>
            We need you to go to settings and grant locations to 'Always'
          </Text>
          <Button onPress={() => Linking.openURL("app-settings:")}>Open</Button>
        </SafeAreaView>
      </>
    );

  if (!currentLocation) return null;

  return (
    <>
      <View>
        <DashboardMap
          lat={currentLocation.coords.latitude}
          lon={currentLocation.coords.longitude}
        />
      </View>

      <DashboardBottomSheet />
    </>
  );
}
