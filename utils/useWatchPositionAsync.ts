import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export const useWatchPositionAsync = () => {
  const [error, setError] = useState<string>();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  useEffect(() => {
    const watchPhoneLocation = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000 },
        (location) => {
          setCurrentLocation(location);
        }
      );
    };

    watchPhoneLocation();
  }, []);

  return { currentLocation, error };
};
