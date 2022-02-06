import React from "react";
import { View } from "react-native";
import { TouchableDefault } from "../TouchableDefault";
import { Title, useTheme, HelperText, Caption } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export function MenuItem({ children, icon, title, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableDefault onPress={onPress}>
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#f5f5f5",
          elevation: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          {children}
          <Title style={{ fontSize: 18, fontWeight: "700" }}>{title}</Title>
        </View>
        <View style={{ paddingRight: 22 }}>
          <FontAwesome5Icon
            name="chevron-right"
            size={24}
            color={colors.black}
          />
        </View>
      </View>
    </TouchableDefault>
  );
}
