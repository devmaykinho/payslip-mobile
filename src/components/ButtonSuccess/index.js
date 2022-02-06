import React from "react";
import { Button, useTheme } from "react-native-paper";

export function ButtonSuccess(props) {
  const { colors } = useTheme();
  return (
    <Button
      contentStyle={{ height: 44 }}
      color={'#3ec78b'}
      {...props}
    >
      {props.label}
    </Button>
  );
}
