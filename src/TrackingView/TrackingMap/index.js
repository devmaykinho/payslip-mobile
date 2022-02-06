import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
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
import api from '../../server/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from '../../Config';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from "@react-navigation/native";

export function TrackingMap() {

  const navigation = useNavigation();
  const {trori} = useLogo();
  const {trdes} = useLogo();
  const LATITUDE_DELTA = 0.9;
  const LONGITUDE_DELTA = 0.9;
  const LATITUDE = -22.9099;
  const LONGITUDE = -47.0626;
  const [locationdata, setLocationdata] = useState([]);
  const [watchid, setWatchid] = useState([]);
  const [markerdata, setMarkerdata] = useState(null);
  const [coordinates,setCoordinates] = useState([
    {
      latitude: -22.9099,
      longitude: -47.0626,
    },
    {
      latitude: -22.9099,
      longitude: -47.0626,
    },
  ]);
  const GOOGLE_API_KEY = 'AIzaSyBt_J40ijgqbrUMjsRFToeLL5d5GG5XqYQ';

  useEffect(() => {
    receivelocation();
    getwatchid();
    return(()=>{
      clearwch(watchid);
    })
  }, [])
    const receivelocation = async() => {
      const scheduleid = await AsyncStorage.getItem("scheduleId");
      const response = await api().get(`/api/schedule/route/${scheduleid}`);
      if(response.status == 200){
        let num = 1;
        setInterval( () => {
          console.log(num,response.data.result[num]);
          setCoordinates([
            {
              latitude: -22.9099,
              longitude: -47.0626,
            },
            {
              latitude: Number(response.data.result[num].latitude),
              longitude: Number(response.data.result[num].longitude),
            },
          ]);
          setLocationdata({
            latitude: Number(response.data.result[num].latitude),
            longitude: Number(response.data.result[num].longitude),
            routeCoordinates: [{latitude: Number(response.data.result[num].latitude),longitude: Number(response.data.result[num].longitude)}],
            distanceTravelled: haversine({
              latitude: -22.9099,
              longitude: -47.0626,
            },{
              latitude: Number(response.data.result[num].latitude),
              longitude: Number(response.data.result[num].longitude),
            }),
            prevLatLng: {},
            coordinate: new AnimatedRegion({
              latitude: Number(response.data.result[num].latitude),
              longitude: Number(response.data.result[num].longitude),
              latitudeDelta: 0.09,
              longitudeDelta: 0.09
            })
          });
          num++;
        }, 1000);
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
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    setWatchid(watchID);
      
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
      <>
        <View style={{ flexDirection: 'row', padding: 15, backgroundColor: '#023d6a' }}>
        <Pressable
          style={({ pressed }) => [
            { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Tracking View</Text>
      </View>
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
          
          {/* <ButtonSuccess
            labelStyle={{ color: '#fff' }}
            label="Start Trip"
            mode="contained"
            onPress={() => {
              alert("Please accept schedule to start trip.")
            }}
          /> */}
        </View>
      </View>
      </>
    );
  }
  else{
    return(
      <>
      <View style={{ flexDirection: 'row', padding: 15, backgroundColor: '#023d6a' }}>
      <Pressable
        style={({ pressed }) => [
          { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
        ]}
        onPress={() => navigation.toggleDrawer()}
        android_ripple={{ color: 'grey', radius: 20, borderless: true }}
      >
        <Icon name="menu" size={30} color="white" />
      </Pressable>
      <Text style={styles.headerText}>Tracking View</Text>
    </View>
    <View style={{justifyContent: 'center',alignItems: 'center',top: 100}}>
    <Text style={{color: '#023d6a',fontSize: 24}}>Something is wrong!</Text>
    </View>
    </>
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
  }, 
  headerText: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff'
  },
});