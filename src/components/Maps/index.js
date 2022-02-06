import React, { useRef, useCallback } from "react";
import { View, Text, SafeAreaView, Platform, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Button, useTheme } from "react-native-paper";

export function Maps({ showButtonsBottom = true }) {
  const { colors } = useTheme();
  const mapRef = useRef();
  const markers = [
    {
      identifier: "start",
      latitude: -23.5517865,
      longitude: -46.6342536,
    },
    {
      identifier: "finally",
      latitude: -23.4484552,
      longitude: -46.5166445,
    },
  ];

  const onMapReadyHandler = () => {
    if (Platform.OS === "ios") {
      mapRef.current.fitToElements(false);
    } else {
      mapRef.current.fitToSuppliedMarkers(["start", "finally"], {
        animated: true,
        edgePadding: {
          top: 100,
          right: 10,
          bottom: 10,
          left: 10,
        },
      });
    }
  };

  const openExternalMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${-23.5517865},${-46.6342536}`;
    const url = Platform.select({
      ios: `${scheme}@${latLng}`,
      android: `${scheme}${latLng}`,
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ height: 240, width: "100%" }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: 200 }}
        onMapReady={onMapReadyHandler}
      >
        {markers.map((marker) => {
          return (
            <Marker
              identifier={marker.identifier}
              key={marker.latitude}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          );
        })}
      </MapView>
      <View
        style={{ height: 3, width: "100%", backgroundColor: colors.primary }}
      />
      {showButtonsBottom && (
        <View
          style={{
            paddingHorizontal: 14,
            height: 44,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MaterialIcon
            name="my-location"
            size={30}
            color={colors.primary}
            onPress={onMapReadyHandler}
          />
          <FontAwesome5Icon
            name="route"
            size={30}
            color={colors.primary}
            onPress={openExternalMaps}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
