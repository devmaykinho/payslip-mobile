import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as S from "./styles";

type ButtonProps = {
  children: React.ReactNode;
  bgColor: "#1F2A4E" | "#FFFFFF" | "transparent";
  color: "#1F2A4E" | "#FFFFFF" | "transparent";
  callback: () => void;
};
const Button: React.FC<ButtonProps> = ({
  callback,
  children,
  bgColor = "transparent",
  color,
}) => {
  return (
    <TouchableOpacity onPress={callback}>
      <S.Button bgColor={bgColor}>
        <S.Text color={color}>{children}</S.Text>
      </S.Button>
    </TouchableOpacity>
  );
};

export default Button;
