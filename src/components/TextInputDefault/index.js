import React from "react";
import { TextInput, useTheme } from "react-native-paper";

export function TextInputDefault(props) {
  const { colors } = useTheme();
  if (props.isPasswordField) {
    return (
      <TextInput
        underlineColor="#fff"
        secureTextEntry
        style={{
          backgroundColor: colors.white,
          borderColor: "red",
          borderWidth: props.HasError ? 2 : 0,
        }}
        {...props}
      ></TextInput>
    );
  }

  return (
    <TextInput
      underlineColor="#fff"
      keyboardType={props.isNumber && "numeric"}
      style={{
        backgroundColor: colors.white,
        fontFamily: "Montserrat_300Light",
        textTransform: "uppercase",
        borderColor: "red",
        borderWidth: props.HasError ? 2 : 0,
      }}
      {...props}
    ></TextInput>
  );
}
