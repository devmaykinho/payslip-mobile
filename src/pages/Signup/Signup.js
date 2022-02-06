import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { Card } from "react-native-shadow-cards";
import { useFormik } from "formik";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { TextInputDefault } from "../../components";
import Button from "../../components/Button";
import { useLogo } from "../../hooks/useLogo";

import Api from "../../server/api";

export function Signup() {
  const { Logo } = useLogo();
  const navigation = useNavigation();

  const [firstStep, setFirstStep] = useState(true);
  const [terms, setTerms] = useState(false);
  const [msgError, setMsgError] = useState("");

  const handleNextStep = () => {
    const aux = validStep1();
    setFirstStep(!aux);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      terms: terms,
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        setMsgError("As senhas devem ser iguais");
        return;
      }

      if (!!values.password && !!values.confirmPassword && terms) {
        let data = {
          name: values.name,
          cpf: values.cpf.trim(),
          telephone: values.phone,
          password: values.password,
          passwordConfirmation: values.confirmPassword,
          terms: values.terms,
        };

        try {
          const response = await Api().post(`user-auth`, data);
          if (response.status == 201) {
            ToastAndroid.show(
              `Usuário ${values.name} cadastrado com sucesso!`,
              ToastAndroid.LONG
            );
            setMsgError("");
            setTerms(false);
            formik.resetForm();
            setFirstStep(true);
            navigation.navigate("SucessSingup");
          } else {
            setMsgError("não foi possível criar cadastro");
          }
        } catch (error) {
          console.log("Erro ao cadastrar usuario", error);
        }
      } else {
        setMsgError("Informe Todos os Dados e Aceite os Termos");
      }
    },
  });

  useEffect(() => {
    if (firstStep) {
      formik.setFieldValue("password", "", true);
      formik.setFieldValue("confirmPassword", "", true);
      setMsgError("");
    }
  }, [firstStep]);

  function validStep1() {
    const cpf = formik.getFieldProps("cpf").value;
    const phone = formik.getFieldProps("phone").value;
    const name = formik.getFieldProps("name").value;

    if (String(cpf).length < 11) {
      setMsgError("CPF - Digite 11 caracteres, somente números");
      return false;
    }
    if (!name || !phone || !cpf) {
      setMsgError("Preencha todos Campos");
      return false;
    }

    setMsgError("");
    return true;
  }

  function handleGoBack() {
    setMsgError("");
    formik.resetForm();
    navigation.goBack();
  }

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "100%" }}>
            <Card
              style={{
                width: "100%",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingLeft: 25,
                  paddingRight: 25,
                  height: 60,
                  backgroundColor: "#1f2a4c",
                }}
              >
                {/* <Image source={Logo} style={{ width: 120, height: 40 }} /> */}
              </View>
              <View style={{ paddingHorizontal: 25 }}>
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "#000",
                      fontFamily: "Montserrat_300Light",
                    }}
                  >
                    Novo
                    <Text style={{ fontFamily: "Montserrat_300Light" }}>
                      {" "}
                      Cadastro
                    </Text>
                  </Text>
                </View>

                <Text style={{ fontSize: 19 }}>
                  {firstStep ? (
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#000",
                        fontFamily: "Montserrat_300Light",
                      }}
                    >
                      Informe os{" "}
                      <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                        seus dados{" "}
                      </Text>
                      <Text>para</Text> <Text>cadastro.</Text>
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#000",
                        fontFamily: "Montserrat_300Light",
                      }}
                    >
                      Informe uma{" "}
                      <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                        senha segura{" "}
                      </Text>
                      <Text>para</Text>{" "}
                      <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                        acesso
                      </Text>
                    </Text>
                  )}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 25 }}>
                {firstStep ? (
                  <>
                    <View style={styles.inputsection}>
                      <TextInputDefault
                        onFocus={() => formik.setTouched({ name: true })}
                        onBlur={() => formik.setTouched({ name: false })}
                        label="NOME"
                        style={styles.input}
                        onChangeText={(text) =>
                          formik.setFieldValue("name", text, true)
                        }
                        value={formik.values.name}
                      />
                    </View>

                    <View style={styles.inputsection}>
                      <TextInputDefault
                        isNumber={true}
                        onFocus={() => formik.setTouched({ cpf: true })}
                        onBlur={() => formik.setTouched({ cpf: false })}
                        label="CPF"
                        style={styles.input}
                        onChangeText={(text) =>
                          formik.setFieldValue("cpf", text, true)
                        }
                        value={formik.values.cpf}
                      />
                    </View>
                    <View style={styles.inputsection}>
                      <TextInputDefault
                        isNumber={true}
                        onFocus={() => formik.setTouched({ phone: true })}
                        onBlur={() => formik.setTouched({ phone: false })}
                        label="CELULAR"
                        style={styles.input}
                        onChangeText={(text) =>
                          formik.setFieldValue("phone", text, true)
                        }
                        value={formik.values.phone}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.inputsection}>
                      <TextInputDefault
                        isPasswordField={true}
                        onFocus={() => formik.setTouched({ password: true })}
                        onBlur={() => formik.setTouched({ password: false })}
                        label="SENHA"
                        style={styles.input}
                        onChangeText={(text) =>
                          formik.setFieldValue("password", text, true)
                        }
                        value={formik.values.password}
                      />
                    </View>
                    <View style={styles.inputsection}>
                      <TextInputDefault
                        isPasswordField={true}
                        onFocus={() =>
                          formik.setTouched({ confirmPassword: true })
                        }
                        onBlur={() =>
                          formik.setTouched({ confirmPassword: false })
                        }
                        label="CONFIRMAR SENHA"
                        style={styles.input}
                        onChangeText={(text) =>
                          formik.setFieldValue("confirmPassword", text, true)
                        }
                        value={formik.values.confirmPassword}
                      />
                    </View>

                    <Checkbox.Item
                      onPress={() => setTerms(!terms)}
                      label="Li e aceito os termos e condições."
                      position="leading"
                      status={terms ? "checked" : "unchecked"}
                      style={{
                        fontFamily: "Montserrat_600SemiBold",
                        paddingLeft: 0,
                        paddingRight: 30,
                      }}
                    />
                  </>
                )}
              </View>
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                {msgError}
              </Text>
              <View style={{ paddingHorizontal: 32 }}>
                {firstStep ? (
                  <>
                    <Button
                      callback={handleNextStep}
                      bgColor="#1F2A4E"
                      color="#FFF"
                    >
                      CONTINUAR
                    </Button>
                    <Button
                      callback={handleGoBack}
                      bgColor="transparent"
                      color="#1F2A4E"
                    >
                      VOLTAR
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      callback={() => formik.handleSubmit()}
                      color="#FFFFFF"
                      bgColor="#1F2A4E"
                    >
                      <Text fontFamily="Montserrat_300Light">CONTINUAR</Text>
                    </Button>
                    <Button callback={() => setFirstStep(true)} color="#1F2A4E">
                      VOLTAR
                    </Button>
                  </>
                )}
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  cardSucess: {
    flex: 1,
    backgroundColor: "red",
  },
  rect: {
    flex: 1,
  },
  rect_imageStyle_truck: {
    // width: "100%",
  },
  inputsection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
  },
  phoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#424242",
    fontSize: 24,
  },
  textInput: {
    paddingVertical: 0,
    justifyContent: "center",
    borderWidth: 2,
    alignItems: "center",
  },
});
