import React, { useEffect, useState } from "react";
import { List, Switch, View } from "components";

import { DashboardMap } from "screens/DashboardScreen/DashboardMap";
import { DashboardBottomSheet } from "screens/DashboardScreen/DashboardBottomSheet";
import { useWatchPositionAsync } from "utils/useWatchPositionAsync";
import { useUpdateCurrentUser } from "modules/users/useUpdateCurrentUser";
import { SafeAreaView } from "react-native";
import { useUpdateCurrentUserLocation } from "modules/users/useUpdateCurrentUserLocation";

const LOCATION_UPDATES_ENABLED = false

export function DashboardScreen() {
  const { currentLocation } = useWatchPositionAsync();

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
