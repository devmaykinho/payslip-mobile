/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import AppControlFlow from "./src/AppControlFlow";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_300Light,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <AppControlFlow />;
};

export default App;
