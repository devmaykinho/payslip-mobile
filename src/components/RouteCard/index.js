import React from "react";
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

export function RouteCard({ onClick }) {
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          height: 240,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={{ height: 98 }}>
            <View
              style={{ display: "flex", flexDirection: "row", height: 120 }}
            >
              <View
                style={{
                  paddingTop: 6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 11,
                    width: 11,
                    borderRadius: 50,
                    backgroundColor: colors.black,
                  }}
                />
                <View
                  style={{
                    height: 110,
                    width: 2,
                    backgroundColor: colors.border,
                  }}
                />
                <View />
              </View>
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
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Cola Cola, Osasco
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Guarulhos Street, 102
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Itaim Bibi
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Today at 20:00h
                </Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", height: 54 }}>
              <View
                style={{
                  paddingTop: 6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 11,
                    width: 11,
                    borderRadius: 50,
                    backgroundColor: colors.black,
                  }}
                />
                <View />
              </View>
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
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Danone LTDA, Rio de Janeiro
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Rua Mesquista Terceiro, 304
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Campinas
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.gray,
                  }}
                >
                  Tomorrow at 15:00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
