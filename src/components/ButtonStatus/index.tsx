import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as S from "./styles";

type ButtonProps = {
  title: string;
  color: "#56AEA5" | "#a6a6a6" | "transparent";
  disable?: boolean;
  callback: () => void;
};
const Button: React.FC<ButtonProps> = ({
  title,
  color = "transparent",
  disable=false,
  callback,
}) => {
  return (
    <TouchableOpacity onPress={callback} disabled={disable}>
      <S.Button color={color}>
        <S.Text>{title}</S.Text>
      </S.Button>
    </TouchableOpacity>
  );
};

export default Button;
