import React, { useEffect, useState } from "react";
import { TouchableOpacity, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogo } from "../../hooks/useLogo";
import * as S from "./styles";

export default function Menu({ navigation }) {
  const { Logo, Menu_Suspenso } = useLogo();
  const [userName, setUserName] = useState('');
  const [userTelephone, setUserTelephone] = useState('');

  const handleShowMenu = () => {
    navigation.goBack();
  };

  const handleOpenWhats = () => {
    const celPhone = "+5519995093962";
    const url = `https://api.whatsapp.com/send?phone=${celPhone}`;
    Linking.openURL(url);
  };

  const handleLoadUserInformation = async () => {
    const name = await AsyncStorage.getItem("name");
    const telephone = await AsyncStorage.getItem("telephone");
    setUserName(name);
    setUserTelephone(telephone);
  }

  useEffect(() => {
    handleLoadUserInformation();
  }, []);

  return (
    <>
      <S.WrapperLogo>
        <TouchableOpacity
          style={{ justifyContent: "center", width: 50, height: "100%" }}
          onPress={handleShowMenu}
        >
          <S.Text>X</S.Text>
        </TouchableOpacity>
        {/* <S.Image source={Logo} /> */}
      </S.WrapperLogo>

      <S.WrapperInfoUser>
        <S.UserName>{userName}</S.UserName>
        <S.UserPhone>{userTelephone}</S.UserPhone>
        {/* <S.Vehicle>Veículo - GHJ8H83</S.Vehicle> */}
        <S.Vehicle></S.Vehicle>
      </S.WrapperInfoUser>

      <S.Ul>
        {/* <S.Li>
          <S.LiItemIcon>
            <Entypo name="sound" size={22} />
          </S.LiItemIcon>
          <S.LiItemDisable>Oferta de Cargas</S.LiItemDisable>
        </S.Li>
        <S.Divider />
        <S.Li onPress={() => navigation.navigate("AcceptedLoads")}>
          <S.LiItemIcon>
            <MaterialCommunityIcons name="bell" size={22} />
          </S.LiItemIcon>
          <S.LiItem>Minha Programação</S.LiItem>
        </S.Li>
        <S.Divider />

        <S.Li>
          <S.LiItemIcon>
            <Entypo name="wallet" size={22} />
          </S.LiItemIcon>
          <S.LiItemDisable>Minha Carteira</S.LiItemDisable>
        </S.Li>
        <S.Divider /> */}

        <S.Li>
          <S.LiItemIcon>
            <FontAwesome name="user" size={22} />
          </S.LiItemIcon>
          <S.LiItemDisable>Meus Dados</S.LiItemDisable>
        </S.Li>
        <S.Divider />

        {/* <S.Li>
          <S.LiItemIcon>
            <Fontisto name="truck" size={22} />
          </S.LiItemIcon>
          <S.LiItemDisable>Meu Veículo</S.LiItemDisable>
        </S.Li>
        <S.Divider /> */}

        <S.Li onPress={handleOpenWhats}>
          <S.LiItemIcon>
            <MaterialIcons name="support-agent" size={22} />
          </S.LiItemIcon>
          <S.LiItem>Fale com o Suporte</S.LiItem>
        </S.Li>
      </S.Ul>

      <S.Logout onPress={() => navigation.navigate("Login")}>
        <S.LiItemIcon>
          <AntDesign name="poweroff" size={18} color="red" />
        </S.LiItemIcon>
        <S.LiItemLogout>Sair</S.LiItemLogout>
      </S.Logout>
    </>
  );
}
