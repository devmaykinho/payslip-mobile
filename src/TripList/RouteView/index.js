import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import * as Geolocation from 'expo-location';
import { useLogo } from "../../hooks/useLogo";
import { TextInputDefault, ButtonDefault,ButtonSuccess } from "../../components";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function RouteView() {

  const {trori} = useLogo();
  const {trdes} = useLogo();
  const LATITUDE_DELTA = 2.9;
  const LONGITUDE_DELTA = 2.9;
  const LATITUDE = -22.9099;
  const LONGITUDE = -47.0626;
  const [locationdata, setLocationdata] = useState([]);
  const [markerdata, setMarkerdata] = useState(null);
  const [coordinates] = useState([
    {
      latitude: -22.9099,
      longitude: -47.0626,
    },
    {
      latitude: -8.2869,
      longitude: -35.0373,
    },
  ]);
  const GOOGLE_API_KEY = 'AIzaSyBt_J40ijgqbrUMjsRFToeLL5d5GG5XqYQ';

  useEffect(() => {
    setLocationdata({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [{latitude: LATITUDE,longitude: LONGITUDE}],
      distanceTravelled: haversine(coordinates[0],coordinates[1]),
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      })
    });
    setTimeout(async () => {
      getwatchid();
    }, 1000);
  }, [])
  const starttrip = async() => {
    const checkin = await AsyncStorage.getItem("checkin");
    if(checkin == null){
      alert("Please Check In to start your Trip in first.");
    }
    else{
      const scheduleid = await AsyncStorage.getItem("scheduleId");
      console.log("started trip",Number(scheduleid));
    }
  }
  const getwatchid = async () =>{
    let { status } = await Geolocation.requestForegroundPermissionsAsync();
    const watchID = await Geolocation.watchPositionAsync(
      {accuracy:Geolocation.Accuracy.High},
      (position) => {
        const { routeCoordinates, distanceTravelled } = locationdata;
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        };

        // if (Platform.OS === "android") {
        //   if (markerdata) {
        //     markerdata._component.animateMarkerToCoordinate(
        //       newCoordinate,
        //       500
        //     );
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }

        // setLocationdata({
        //   latitude,
        //   longitude,
        //   routeCoordinates: routeCoordinates.concat(newCoordinate),
        //   distanceTravelled:
        //     distanceTravelled + calcDistance(newCoordinate),
        //   prevLatLng: newCoordinate
        // });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    setTimeout(() => {
      clearwch(watchID);
    }, 3000);
  }
  const clearwch = (watchID) => {
    navigator.geolocation.clearWatch(watchID);
  }

  const getMapRegion = () => ({
    latitude: locationdata.latitude,
    longitude: locationdata.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  const calcDistance = (newLatLng) => {
    const { prevLatLng } = locationdata;
    return haversine(prevLatLng, newLatLng) || 0;
  };
  if(locationdata['latitude'] != null){
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={getMapRegion()}
        >
          {/* <Polyline coordinates={coordinates} strokeWidth={5} /> */}

          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={GOOGLE_API_KEY} // insert your API Key here
            strokeWidth={4}
            strokeColor="#023d6a"
          />
          <Marker.Animated
            ref={marker => {
              setMarkerdata(marker);
            }}
            coordinate={locationdata.coordinate}
          >
          <Image source={trori} style={{height: 35, width:35 }} />
          </Marker.Animated>

          <Marker.Animated
            ref={marker => {
              setMarkerdata(marker);
            }}
            coordinate={coordinates[1]}
          >
          <Image source={trdes} style={{height: 35, width:35 }} />
          </Marker.Animated>
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={{fontSize: 24}}>
              {parseFloat(locationdata.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
          
          <ButtonSuccess
            labelStyle={{ color: '#fff' }}
            label="Iniciar Viagem"
            mode="contained"
            onPress={() => {
              starttrip();
            }}
          />
        </View>
      </View>
      
    );
  }
  else{
    return(
      <></>
    )
  }
    
  }

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});