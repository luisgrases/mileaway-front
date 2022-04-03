import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { AppState } from "react-native";

export const useWatchPositionAsync = () => {
  const locationWatcher = useRef<{ remove(): void }>();
  const [granted, setGranted] = useState<boolean>();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  const watchPhoneLocation = async () => {
    let { granted: grantedForeground } =
      await Location.requestForegroundPermissionsAsync();

    const { granted: grantedBackground } =
      await Location.requestBackgroundPermissionsAsync();

    setGranted(grantedForeground && grantedBackground);

    if (!(grantedForeground && grantedBackground)) return;

    if (locationWatcher.current) return;

    locationWatcher.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100,
      },
      (location) => {
        setCurrentLocation(location);
      }
    );
  };

  useEffect(() => {
    AppState.addEventListener("change", watchPhoneLocation);

    return () => {
      AppState.removeEventListener("change", watchPhoneLocation);
    };
  }, []);

  useEffect(() => {
    watchPhoneLocation();
    return () => locationWatcher.current?.remove();
  }, []);

  return { currentLocation, granted };
};
