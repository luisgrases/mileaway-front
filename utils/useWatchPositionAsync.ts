import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

const DISTANCE_INTERVAL_IN_METERS = 20;

export const useWatchPositionAsync = () => {
  const locationWatcher = useRef<{ remove(): void }>();
  const [error, setError] = useState<string>();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  useEffect(() => {
    const watchPhoneLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
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

    watchPhoneLocation();
    return () => locationWatcher.current?.remove();
  }, []);

  return { currentLocation, error };
};
