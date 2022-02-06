import React from "react";
import Button from "../../components/Button";
import * as S from "./styles";
import { Text } from "react-native";

const Home: React.FC = ({ navigation }: any) => {
  return (
    <S.Wrapper>
      <S.ImageBackground >
      <S.ContentHome>
        <S.TextHome>
          <S.TextHomeBold>GTA</S.TextHomeBold> Serviços
        </S.TextHome>
      </S.ContentHome>
      <Button 
        bgColor="#FFFFFF"
        color="#1F2A4E"
        callback={() => navigation.navigate("Login")}
      >
        <Text style={{ fontFamily: "Montserrat_300Light" }}>MINHA CONTA</Text>
      </Button>

      <Button
        bgColor="transparent"
        color="#FFFFFF"
        callback={() => navigation.navigate("Signup")}
      >
        <Text
          style={{
            textTransform: "uppercase",
            fontFamily: "Montserrat_300Light",
          }}
        >
          Novo Cadastro
        </Text>
      </Button>
      </S.ImageBackground>
    </S.Wrapper>
  );
};

export default Home;
