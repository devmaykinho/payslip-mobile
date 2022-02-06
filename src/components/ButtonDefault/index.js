import React from "react";
import { Button, useTheme } from "react-native-paper";

export function ButtonDefault(props) {
  const { colors } = useTheme();
  return (
    <Button
      contentStyle={{ height: 44 }}
      color={'#023d6a'}
      {...props}
    >
      {props.label}
    </Button>
  );
}
