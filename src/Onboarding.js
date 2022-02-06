import React, { useEffect, useState } from "react";
import { View, Image, SafeAreaView,ImageBackground, StyleSheet } from "react-native";
import { Title, Subheading, Text, useTheme } from "react-native-paper";
import { useLogo } from "./hooks/useLogo";
import { TextInputDefault, ButtonDefault } from "./components";
import { useNavigation } from "@react-navigation/native";

import {Card} from 'react-native-shadow-cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Onboarding() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { coloricon, back2 } = useLogo();
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect( () => {
    localStage();
  }, [])

  const localStage = async () => {
    const name =  await AsyncStorage.getItem('userName');
    const usertype =  await AsyncStorage.getItem('userType');
    setUserName(name);
    setUserType(usertype);
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <ImageBackground
              style={styles.rect}
              imageStyle={styles.rect_imageStyle_truck}
              source={back2}
            >
      <View style={{flex: 0.2,width: '100%',justifyContent: 'flex-start', alignItems: 'flex-start' }}></View>
      <View style={{flex: 0.8,width: '100%',justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Card 
          style={{flex:1, width: '100%'}}
          elevation={10}
          cornerRadius={55}
          >
            <View
              style={{
                display: "flex",
                flex: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title style={{ color: '#023d6a', textAlign: "center",fontSize: 30}}>
                Olá, {userName}!
              </Title>
              {userType == 'DRIVER'?
                <Subheading style={{ textAlign: "center",fontSize: 24 }}>
                Acesse suas programações.
                </Subheading>
              :null}
              {userType == 'CLIENT'?
                <Subheading style={{ textAlign: "center",fontSize: 24 }}>
                Confira sua programação de hoje.
                </Subheading>
              :null}
            </View>
            <View style={{ flex: 2,paddingHorizontal: 32, marginBottom: 28 }}>
              {userType == 'DRIVER'?
                <ButtonDefault
                  label="Ordens de Coletas"
                  labelStyle={{ color: '#fff' }}
                  color={'#023d6a'}
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("AcceptedList");
                  }}
                />
              :null}
              {userType == 'CLIENT'?
                <View>
                  <ButtonDefault
                    label="minha programação"
                    labelStyle={{ color: '#fff' }}
                    color={'#023d6a'}
                    mode="contained"
                    onPress={() => {
                      navigation.navigate("CreateSchedule");
                    }}
                  />
                  <ButtonDefault
                    label="Ofertas de Cargas"
                    labelStyle={{ color: '#023d6a' }}
                    mode="outlined"
                    onPress={() => {
                      navigation.navigate("CreateSchedule");
                    }}
                  />
                  </View>
              :null}
            </View>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
  },
  rect_imageStyle_truck: {
    width: '100%',
  },
  inputsection: {
    height: 84,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconstyle: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: 'transparent',
      color: '#424242',
      fontSize: 24
  },
  phoneContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#424242',
    fontSize: 24,
  },
  textInput: {
    paddingVertical: 0,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#023d6a',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});