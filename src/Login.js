import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "./components/Button";

import {
  View,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  ToastAndroid,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useLogo } from "./hooks/useLogo";
import { TextInputDefault } from "./components";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-shadow-cards";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "./server/api";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Login() {
  const navigation = useNavigation();
  const [cpf, setCPF] = useState();
  const [password, setPassword] = useState();

  const { back1, back2 } = useLogo();
  const [modalVisible, setModalVisible] = useState(null);
  const { colors } = useTheme();

  const handleLogin = async () => {
    console.log("LOGAR:", { cpf, password });
    alert(`LOGAR, ${cpf} - ${password}`);
    // const response = await api().post("/api/login", { cpf, password });
    // if (response.status == 200) {
    //   const { data } = response;

    //   await AsyncStorage.setItem("token", data.result.token);
    //   await AsyncStorage.setItem("user", JSON.stringify(data.result.user));

    //   ToastAndroid.show(
    //     `${response.data.result.user.name} logged in successfully as ${checked}`,
    //     ToastAndroid.LONG
    //   );
    //   navigation.navigate("Onboarding");
    // } else {
    //   ToastAndroid.show(`Invaliad Credential`, ToastAndroid.LONG);
    // }
  };

  useEffect(() => {
    clearstorage();
  }, []);

  const clearstorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            backgroundColor: "red",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={back1}
          >
            <Modal
              height="90%"
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <SafeAreaView
                    style={{
                      backgroundColor: colors.white,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ImageBackground
                      style={styles.rect}
                      imageStyle={styles.rect_imageStyle_truck}
                      source={back2}
                    >
                      <View
                        style={{
                          flex: 1,
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          justifyContent: "space-between",
                          zIndex: 9999,
                        }}
                      >
                        <Card style={{ width: "100%", paddingHorizontal: 20 }}>
                          <View
                            style={{
                              paddingTop: 20,
                              marginBottom: 50,
                            }}
                          >
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                              Olá, bem-vindo!
                            </Text>

                            <Text style={{ fontSize: 24 }}>
                              Informe o seu usuário e senha para acesso.
                            </Text>
                          </View>

                          <View>
                            <View style={styles.inputsection}>
                              <TextInputDefault
                                isNumber={true}
                                label="CPF"
                                style={styles.input}
                                onChangeText={(text) => setCPF(text)}
                                value={cpf}
                              />
                            </View>

                            <View style={styles.inputsection}>
                              <TextInputDefault
                                isPasswordField={true}
                                label="Senha"
                                style={styles.input}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                              />
                            </View>
                          </View>

                          <View  style={{ marginBottom: 80, backgroundColor: "red" }}>
                            <TouchableOpacity onPress={handleLogin}>
                              <Button color="#FFFFFF">Acessar</Button>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => navigation.goBack()}
                            >
                              <Button color="transparent">Voltar</Button>
                            </TouchableOpacity>
                          </View>
                        </Card>
                      </View>
                    </ImageBackground>
                  </SafeAreaView>
                </TouchableWithoutFeedback>
              </KeyboardAwareScrollView>
            </Modal>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
                width: "80%",
              }}
            >
              <Button color="#FFFFFF" callback={() => setModalVisible(true)}>
                Minha Conta
              </Button>

              <Button callback={() => navigation.navigate("Signup")}>
                Novo Cadastro
              </Button>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
  },
  rect_imageStyle: {
    height: "100%",
  },
  rect_imageStyle_truck: {
    opacity: 1,
  },
  inputsection: {
    height: 84,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconstyle: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: "#eaeaea",
    color: "#424242",
    fontSize: 16,
  },
  phoneContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    color: "#424242",
    fontSize: 24,
  },
  textInput: {
    paddingVertical: 0,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#023d6a",
    height: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
