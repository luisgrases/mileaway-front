import React, { useEffect, useState } from "react";
import { View } from "components";

import { DashboardMap } from "screens/DashboardScreen/DashboardMap";
import { DashboardBottomSheet } from "screens/DashboardScreen/DashboardBottomSheet";
import { useWatchPositionAsync } from "utils/useWatchPositionAsync";
import { useUpdateCurrentUser } from "modules/users/useUpdateCurrentUser";

export function DashboardScreen() {
  const { currentLocation, error } = useWatchPositionAsync();

  // const currentLocation = {
  //   coords: {
  //     latitude: 12,
  //     longitude: 14,
  //   },
  // };

  console.log("currentLocation", currentLocation);

  const [isSharingLocation, setIsSharingLocation] = useState(true);

  const { mutateAsync: updateCurrentUser } = useUpdateCurrentUser();

  useEffect(() => {
    if (currentLocation) {
      console.log("currentLocationn", currentLocation);
      updateCurrentUser({
        location: {
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        },
      });
    }
  }, [currentLocation]);

  if (!currentLocation) return null;

  return (
    <>
      <View>
        <DashboardMap
          isSharingLocation={isSharingLocation}
          lat={currentLocation.coords.latitude}
          lon={currentLocation.coords.longitude}
        />
      </View>

      <DashboardBottomSheet
        isSharingLocation={isSharingLocation}
        onLocationSharingChange={setIsSharingLocation}
      />
    </>
  );
}
