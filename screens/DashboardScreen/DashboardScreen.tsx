import React, { useState } from "react";
import { View } from "components";

import { DashboardMap } from "screens/DashboardScreen/DashboardMap";
import { DashboardBottomSheet } from "screens/DashboardScreen/DashboardBottomSheet";
import { useWatchPositionAsync } from "utils/useWatchPositionAsync";

const FAKE_LOCATION = {
  lat: 9.931423120648843,
  lon: -84.14629818877998,
};

export function DashboardScreen() {
  const { location, error } = useWatchPositionAsync();

  const [isSharingLocation, setIsSharingLocation] = useState(true);

  return (
    <>
      <View>
        <DashboardMap
          isSharingLocation={isSharingLocation}
          lat={FAKE_LOCATION.lat}
          lon={FAKE_LOCATION.lon}
        />
      </View>

      <DashboardBottomSheet
        isSharingLocation={isSharingLocation}
        onLocationSharingChange={setIsSharingLocation}
      />
    </>
  );
}
