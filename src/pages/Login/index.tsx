import React, { useState, useEffect } from "react";
import { Text, ToastAndroid, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import Api from "../../server/api";
import * as S from "./styles";
import { useLogo } from "../../hooks/useLogo";

export default function Login({ navigation }) {
  const { Logo } = useLogo();

  const [cpf, setCPF] = useState("");
  const [cpfError, setCPFError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const handleLogin = async () => {
    setPasswordError(password === "");
    setCPFError(cpf === "");

    if (cpfError || passwordError) return;

    try {
      const response = await Api().post("signin", { cpf, password });

      if (response.status == 200) {
        const { data } = response;
        if(data.status != 'ACTIVATED') {
          ToastAndroid.show(`Usuário pendente de aprovação`, ToastAndroid.LONG);
        }else {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("name", data.name);
          await AsyncStorage.setItem("telephone", data.telephone);
          await AsyncStorage.setItem("userAuthId", data.userAuthId);
          await clearForm();
          navigation.navigate("AcceptedLoads");
        }
      }
    } catch (error) {
      if (cpfError || passwordError) return;
      ToastAndroid.show(`Usuário ou Senha Inválidos`, ToastAndroid.LONG);
    }
  };

  async function clearForm() {
    setCPF("");
    setPassword("");
  }
  useEffect(() => {
    clearstorage();
  }, []);

  const clearstorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <>
      <S.Logo>
        {/* <S.Image source={Logo} /> */}
      </S.Logo>

      <S.Wrapper>
        <S.WrapperHeader>
          <S.Title>Seja bem-vindo!</S.Title>
          <S.SubTitle>
            Informe o seu{" "}
            <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
              usuário
            </Text>{" "}
            e{" "}
            <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>senha</Text>{" "}
            para acesso.
          </S.SubTitle>
        </S.WrapperHeader>

        <S.WrapperContent>
          <S.TextInput
            placeholder="CPF"
            onChangeText={(text) => setCPF(text)}
            value={cpf}
            hasError={cpfError}
            keyboardType="numeric"
          />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <S.TextInput
              secureTextEntry={!viewPassword}
              placeholder="SENHA"
              onChangeText={(text) => setPassword(text)}
              value={password}
              hasError={passwordError}
            />
            <View
              onTouchEnd={() => setViewPassword(!viewPassword)}
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                right: 10,
                width: 50,
                height: 40,
              }}
            >
              <Icon
                name={!viewPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
              />
            </View>
          </View>
        </S.WrapperContent>

        <S.WrapperFooter>
          <Button callback={handleLogin} bgColor="#1F2A4E" color="#FFFFFF">
            <Text style={{ fontFamily: "Montserrat_300Light" }}>ENTRAR</Text>
          </Button>

          <Button
            callback={() => navigation.navigate("Home")}
            color="#1F2A4E"
            bgColor="transparent"
          >
            <Text style={{ fontFamily: "Montserrat_300Light" }}>VOLTAR</Text>
          </Button>
        </S.WrapperFooter>
      </S.Wrapper>
    </>
  );
}
