import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

export function TouchableDefault(props) {
  if (Platform.OS === "android") {
    return <TouchableNativeFeedback {...props} />;
  }
  if (Platform.OS === "ios") {
    return <TouchableOpacity {...props} activeOpacity={0.5} />;
  }
}
