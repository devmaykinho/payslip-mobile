import React from "react";
import * as S from "./styles";
import Button from "../../components/Button";
import { useLogo } from "../../hooks/useLogo";
import { View } from "react-native";

const SucessSingup: React.FC = ({ navigation }: any) => {
  const { Icon_Congrats } = useLogo();
  function handleClose() {
    navigation.navigate("Login");
  }

  return (
    <S.Wrapper>
      <S.ImageBackground source={Icon_Congrats} />
      <S.Content>
        <S.H1>Parabéns!</S.H1>
        <S.H2>Seu cadastro já está em análise.</S.H2>
        <S.H2>
          Assim que concluído, você receberá uma mensagem com liberação de
          acesso.
        </S.H2>
      </S.Content>
      <S.Button>
        <Button bgColor="#1F2A4E" color="#FFFFFF" callback={handleClose}>
          FECHAR
        </Button>
      </S.Button>
    </S.Wrapper>
  );
};

export default SucessSingup;
