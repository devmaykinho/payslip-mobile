import React from 'react';
import { Button, useTheme } from 'react-native-paper';

export function ButtonDanger(props) {
  const { colors } = useTheme();
  return (
    <Button
      contentStyle={{ height: 44 }}
      color={'#df4759'}
      {...props}
    >
      {props.label}
    </Button>
  );
}
