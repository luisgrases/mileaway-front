import React from "react";
import { Flexbox, SafeAreaView, View, useTheme } from "components";
import MapView from "react-native-maps";

export const DashboardMap = ({ lat, lon, isSharingLocation }) => {
  return (
    <View style={{ position: "relative" }}>
      <MapView
        mapPadding={{ top: 0, right: 0, bottom: 450, left: 0 }}
        provider="google"
        minZoomLevel={13}
        maxZoomLevel={13}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomTapEnabled={false}
        zoomControlEnabled={false}
        rotateEnabled={false}
        region={{
          latitudeDelta: 0,
          longitudeDelta: 0,
          latitude: lat,
          longitude: lon,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Flexbox
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          bottom: 450,
        }}
        align="center"
        justify="center"
      >
        <DiscoveryRange isSharingLocation={isSharingLocation} />
        <CurrentPositionMarker />
      </Flexbox>
    </View>
  );
};

const DiscoveryRange = ({ isSharingLocation }) => {
  const theme = useTheme();

  return (
    <Flexbox
      style={{
        position: "absolute",
        borderRadius: 320,
        width: 150,
        height: 150,
        backgroundColor: isSharingLocation
          ? theme["color-primary-default"]
          : "gray",
        opacity: 0.2,
      }}
      align="center"
      justify="center"
      selfAlign="center"
    />
  );
};

const CurrentPositionMarker = () => {
  const theme = useTheme();

  return (
    <Flexbox
      style={{
        position: "relative",
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.2,
        elevation: 5,
      }}
      align="center"
      justify="center"
      selfAlign="center"
    >
      <View
        style={{
          borderRadius: 10,
          width: 10,
          height: 10,
          backgroundColor: theme["color-primary-default"],
        }}
      />
    </Flexbox>
  );
};
