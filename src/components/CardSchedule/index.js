import React, { useEffect, useState } from "react";
import { View, Pressable, TouchableNativeFeedback } from "react-native";
import {
  Title,
  useTheme,
  HelperText,
  Text,
  Caption,
  Subheading,
} from "react-native-paper";
import { TouchableDefault } from "../TouchableDefault";
import { useNavigation } from "@react-navigation/native";

export function CardSchedule({ item, data }) {
  const [allocations, setAllocations] = useState({})
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    setAllocations(item);
  }, [])

  return (
    <TouchableDefault onPress={() => navigation.navigate('AcceptedScreen', { clientId: allocations.client_id, data: data })} >
      <View
        style={{
          elevation: 1,
          height: 148,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 0,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", padding: 10 }}>
          <View
            style={{
              width: "100%",
              display: "flex",
              height: 30,
            }}
          >
            <Caption style={{ fontSize: 14, fontWeight: "bold" }}>{allocations.client?.name}</Caption>
          </View>
          <View style={{ height: 98 }}>
            <View style={{ display: "flex", flexDirection: "row", height: 54 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  paddingLeft: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  Number of Allocations: {allocations.count}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableDefault>
  );
}
