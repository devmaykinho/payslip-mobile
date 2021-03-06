import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HotelHomeScreen } from "./hotel_booking";
import DrawerContent from "./DrawerContent";
import { Signup } from "./pages/Signup/Signup";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AcceptedLoads from "./pages/PayslipList";
import SucessSingup from "./pages/SucessSingup";
import Menu from "./pages/Menu";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator: React.FC = () => {
  const window = useWindowDimensions();
  return (
    <Stack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerType="back"
      overlayColor="transparent"
      drawerStyle={{
        width: window.width * 0.75,
        backgroundColor: "#FFFEFEFE",
      }}
      edgeWidth={window.width}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AcceptedLoads" component={AcceptedLoads} />
      <Stack.Screen name="SucessSingup" component={SucessSingup} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
};

// export default DrawerNavigator

export default () => {
  return (
    <>
      <StatusBar
        backgroundColor="#18203c"
        barStyle="light-content"
        translucent={false}
      />

      <Stack.Navigator screenOptions={{ headerBackTitle: "", title: "" }}>
        <Stack.Screen
          name="MainDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Hotel"
          component={HotelHomeScreen}
          options={{
            headerShown: true,
            headerTitle: "Explore",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 22 },
            headerLeft: (props) => (
              <Pressable
                {...props}
                style={{ padding: 8, marginLeft: 8 }}
                android_ripple={{ color: "grey", radius: 20, borderless: true }}
              >
                <Icon name="arrow-back" size={25} color="black" />
              </Pressable>
            ),
            headerRight: () => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    style={{ paddingHorizontal: 8 }}
                    name="favorite-border"
                    size={25}
                    color="black"
                  />
                  <Icon
                    style={{ paddingHorizontal: 8 }}
                    name="location-pin"
                    size={25}
                    color="black"
                  />
                </View>
              );
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
};
