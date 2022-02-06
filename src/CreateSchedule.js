import React, { useEffect, useState } from "react";
import { View, 
  FlatList,
  Image,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ToastAndroid,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,} from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { CardSchedule } from "./components";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title, useTheme, HelperText, Caption,RadioButton } from "react-native-paper";
import { useLogo } from "./hooks/useLogo";
import { TextInputDefault, ButtonDefault } from "./components";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import api from './server/api';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from './Config';

const ScheduleSchema = Yup.object().shape({
  starttime: Yup.string().required("Required field!"),
  endtime: Yup.string().required("Required field!"),
  dischargedate: Yup.string().required("Required field!"),
  ocnumber: Yup.string().required("Required field!"),
  vehicletypeid: Yup.string().required("Required field!"),
  vehiclecategoryid: Yup.string().required("Required field!"),
  operationtypeid: Yup.string().required("Required field!"),
  cdid: Yup.string().required("Required field!"),
  plantid: Yup.string().required("Required field!"),
  description: Yup.string(),
});

export function CreateSchedule() {
  const [allocations, setAllocations] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { coloricon } = useLogo();
  const [errors, setErros] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isstartVisible, setStartvisible] = useState(false);
  const [isendVisible, setEndvisible] = useState(false);
  const [isdischargeVisible, setDischargevisible] = useState(false);
  const [starttime, setStarttime] = useState('00:00');
  const [endtime, setEndtime] = useState('00:00');
  const [discharge, setDischarge] = useState('1970-01-01');
  const [vehicletype, setVehicletype] = useState("");
  const [vehiclecategory, setVehiclecategory] = useState("");
  const [operation, setOperation] = useState("");
  const [cd, setCd] = useState("");
  const [plant, setPlant] = useState("");
  const [vehicleItem, setVehicleItem] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [cdItem, setCdItem] = useState([]);
  const [plantItem, setPlantItem] = useState([]);
  const [operationItem, setOperationItem] = useState([]);
  const showstartpicker = () => {
    setStartvisible(!isstartVisible);
  };
  const hidestartpicker = () =>{
    setStartvisible(!isstartVisible);
  }
  const startpicker = (date) => {
    let hour = date.getHours();
    let min = date.getMinutes();
    if(min < 10){
      setStarttime(hour+":0"+min);
    }
    else{
      setStarttime(hour+":"+min);
    }
    hidestartpicker();
  };
  const showendpicker = () => {
    setEndvisible(!isendVisible);
  };
  const hideendpicker = () =>{
    setEndvisible(!isendVisible);
  }
  const endpicker = (date) => {
    let hour = date.getHours();
    let min = date.getMinutes();
    setEndtime(hour+":"+min);
    hideendpicker();
  };
  const datepicker = () => {
    setDischargevisible(!isdischargeVisible);
  };
  const hidedischargepicker = () =>{
    setDischargevisible(!isdischargeVisible);
  }
  const dischargepicker = (date) => {
    let yy = date.getFullYear();
    let mm = date.getMonth();
    let dd = date.getDate();
    setDischarge(yy+"-"+mm+"-"+dd);
    hidedischargepicker();
  };
  const formik = useFormik({
    initialValues: {
      starttime: "",
      endtime: "",
      dischargedate: "",
      ocnumber: "",
      vehicletypeid: "",
      vehiclecategoryid: "",
      operationtypeid: "",
      cdid: "",
      plantid: "",
      description: "",
    },
    validationSchema: ScheduleSchema,
    onSubmit: async (values) => {
    const userid = await AsyncStorage.getItem('userId');
    if(
      values.starttime == "" || 
      values.endtime == "" || 
      values.dischargedate == "" || 
      values.ocnumber == "" || 
      values.vehicletypeid == "" || 
      values.vehiclecategoryid == "" || 
      values.operationtypeid == "" || 
      values.cdid == "" || 
      values.plantid == "" || 
      values.description == ""){
        ToastAndroid.show(`Please fill all fields`, ToastAndroid.LONG);
      }else{
        let data = {
          userId: userid,
          startTime: values.starttime,
          endTime: values.endtime,
          dischargeDate: values.dischargedate,
          ocNumber: values.ocnumber,
          vehicleTypeId: values.vehicletypeid.split('(')[1].split(')')[0],
          vehicleCategoryId: values.vehiclecategoryid.split('(')[1].split(')')[0],
          operationTypeId: values.operationtypeid.split('(')[1].split(')')[0],
          cdId: values.cdid.split('(')[1].split(')')[0],
          plantId: values.plantid.split('(')[1].split(')')[0],
          plantCod: values.plantid.split(')(')[1].split(')')[0],
          description: values.description,
        };
        const response = await api().post(`/api/schedule`, JSON.stringify(data));
        if(response.status == 200){
          setErros(false);
          ToastAndroid.show(`you submitted schedule successfully.`, ToastAndroid.LONG);
          navigation.navigate("MenuListHome");
        }else{
          setErros(true);
        }
      }
      
    },
  });
  const getIds = async () => {
    const userid = await AsyncStorage.getItem('userId');
    console.log("userId",userid);
    const response = await api().get(`/api/schedule/bff/32`);
    if(response.status == 200){
      const data = response.data;
      setAllocations(data);
      var items = [];
      var items1 = [];
      var items2 = [];
      var items3 = [];
      var items4 = [];
      for(let i = 0; i < data.result.vehicleTypes.length; i ++){
        var item = { label: data.result.vehicleTypes[i].name, value: data.result.vehicleTypes[i].name + "(" + data.result.vehicleTypes[i].id + ")" };
        items.push(item);
      }
      for(let i = 0; i < data.result.vehicleCategories.length; i ++){
        var item = { label: data.result.vehicleCategories[i].name, value: data.result.vehicleCategories[i].name + "(" + data.result.vehicleCategories[i].id + ")" };
        items1.push(item);
      }
      for(let i = 0; i < data.result.operationTypes.length; i ++){
        var item = { label: data.result.operationTypes[i].description, value: data.result.operationTypes[i].description + "(" + data.result.operationTypes[i].id + ")" };
        items2.push(item);
      }
      for(let i = 0; i < data.result.cds.length; i ++){
        var item = { label: data.result.cds[i].cep, value: data.result.cds[i].cep + "(" + data.result.cds[i].id + ")" };
        items3.push(item);
      }
      for(let i = 0; i < data.result.plants.length; i ++){
        var item = { label: data.result.plants[i].description, value: data.result.plants[i].description + "(" + data.result.plants[i].id + ")" + "(" + data.result.plants[i].cod + ")" };
        items4.push(item);
      }
      setVehicleItem(items);
      setCategoryItem(items1);
      setOperationItem(items2);
      setCdItem(items3);
      setPlantItem(items4);
      setLoading(false);
    }else{
    }
  }

  useEffect(() => {

    getIds();
  }, [])

  useFocusEffect(() => {
    
  });    
  if(allocations.severity == 'success' && !loading){
    return (
      // <FlatList
      //   showsVerticalScrollIndicator={false}
      //   contentContainerStyle={{ padding: 10 }}
      //   keyExtractor={(item) => item.toString()}
      //   data={allocations}
      //   renderItem={({ item }) => {
      //     return (
      //       <View style={{ marginBottom: 10 }}>
      //         <CardSchedule
      //           item={item}
      //           data={
      //             {
      //               statusCod: 'AC', 
      //               newStatus: 3, 
      //               buttonTitle: 'ACCEPT', 
      //               screen: 'DetailRoute'
      //             }
      //           }
      //         />
      //       </View>
      //     );
      //   }}
      // />
      <>
        <View style={{ flexDirection: 'row', padding: 15, backgroundColor: '#023d6a' }}>
        <Pressable
          style={({ pressed }) => [
            { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Agendamento</Text>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{
              backgroundColor: colors.white,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.inputsection}>
              <FontAwesome5Icon
                name={'stopwatch'}
                size={30}
                style={styles.iconstyle}
                color={'#023d6a'}
              />
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Horário Inicial"
                style={styles.input}
                onChangeText={(text) =>
                  formik.setFieldValue("starttime", text, true)
                }
                value={formik.values.starttime = starttime}
              />
              <Button
                onPress={showstartpicker}
                title="  Hora Inicio  "
                color={'#023d6a'}
              />
              <DateTimePickerModal
                isVisible={isstartVisible}
                mode="time"
                onConfirm={startpicker}
                onCancel={hidestartpicker}
              />
            </View>

            <View style={styles.inputsection}>
              <FontAwesome5Icon
                name={'stopwatch'}
                size={30}
                style={styles.iconstyle}
                color={'#023d6a'}
              />
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Horário Final"
                style={styles.input}
                onChangeText={(text) =>
                  formik.setFieldValue("endtime", text, true)
                }
                value={formik.values.endtime = endtime}
              />
              <Button
                onPress={showendpicker}
                title="  Hora Fim  "
                color={'#023d6a'}
              />
              <DateTimePickerModal
                isVisible={isendVisible}
                mode="time"
                onConfirm={endpicker}
                onCancel={hideendpicker}
              />
            </View>

            <View style={styles.inputsection}>
              <FontAwesome5Icon
                name={'calendar-check'}
                size={30}
                style={styles.iconstyle}
                color={'#023d6a'}
              />
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Data da descarga"
                style={styles.input}
                onChangeText={(text) =>
                  formik.setFieldValue("dischargedate", text, true)
                }
                value={formik.values.dischargedate = discharge}
              />
              <Button
                onPress={datepicker}
                title="  Programação  "
                color={'#023d6a'}
              />
              <DateTimePickerModal
                isVisible={isdischargeVisible}
                mode="date"
                onConfirm={dischargepicker}
                onCancel={hidedischargepicker}
              />
            </View>

            <View style={styles.inputsection}>
              <FontAwesome5Icon
                name={'file-alt'}
                size={30}
                style={styles.iconstyle}
                color={'#023d6a'}
              />
              <TextInputDefault
                onFocus={() => formik.setTouched({ ocnumber: true })}
                onBlur={() => formik.setTouched({ ocnumber: false })}
                error={formik.errors.ocnumber && formik.touched.ocnumber}
                style={styles.input}
                label="Senha Carregamento"
                onChangeText={(text) =>
                  formik.setFieldValue("ocnumber", text, true)
                }
                value={formik.values.ocnumber}
              />
              {formik.touched.ocnumber && formik.errors.ocnumber && (
                <HelperText type="error" visible={formik.errors.ocnumber}>
                  {formik.errors.ocnumber}
                </HelperText>
              )}
            </View>

            <View style={styles.inputsection}>
              <View style={{flex: 2,}}>
                <FontAwesome5Icon
                  name={'map-marked-alt'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
              </View>
              
              <View style={{flex: 5}}>
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="CD"
                style={styles.pickerinput}
                onChangeText={(text) =>
                  formik.setFieldValue("cdid", text, true)
                }
                value={formik.values.cdid = cd}
              />
              </View>
              <View style={{flex: 3}}>
                <RNPickerSelect
                  onValueChange={(value) => {setCd(value);}}
                  useNativeAndroidPickerStyle={false}
                  items={cdItem}
              />
              </View>
            </View>

            <View style={styles.inputsection}>
              <View style={{flex: 2,}}>
                <FontAwesome5Icon
                  name={'building'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
              </View>
              
              <View style={{flex: 5}}>
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Planta"
                style={styles.pickerinput}
                onChangeText={(text) =>
                  formik.setFieldValue("plantid", text, true)
                }
                value={formik.values.plantid = plant}
              />
              </View>
              <View style={{flex: 3}}>
                <RNPickerSelect
                  onValueChange={(value) => {setPlant(value);}}
                  useNativeAndroidPickerStyle={false}
                  items={plantItem}
              />
              </View>
            </View>

            <View style={styles.inputsection}>
              <View style={{flex: 2,}}>
                <FontAwesome5Icon
                  name={'truck'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
              </View>
              
              <View style={{flex: 5}}>
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Tipo de Veículo"
                style={styles.pickerinput}
                onChangeText={(text) =>
                  formik.setFieldValue("vehicletypeid", text, true)
                }
                value={formik.values.vehicletypeid = vehicletype}
              />
              </View>
              <View style={{flex: 3}}>
                <RNPickerSelect
                  onValueChange={(value) => {setVehicletype(value);}}
                  useNativeAndroidPickerStyle={false}
                  items={vehicleItem}
                />
              </View>
            </View>


            <View style={styles.inputsection}>
              <View style={{flex: 2,}}>
                <FontAwesome5Icon
                  name={'truck'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
              </View>
              
              <View style={{flex: 5}}>
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Categoria Veículo"
                style={styles.pickerinput}
                onChangeText={(text) =>
                  formik.setFieldValue("vehiclecategoryid", text, true)
                }
                value={formik.values.vehiclecategoryid = vehiclecategory}
              />
              </View>
              <View style={{flex: 3}}>
                <RNPickerSelect
                  onValueChange={(value) => {setVehiclecategory(value);}}
                  useNativeAndroidPickerStyle={false}
                  items={categoryItem}
              />
              </View>
            </View>


            <View style={styles.inputsection}>
              <View style={{flex: 2,}}>
                <FontAwesome5Icon
                  name={'truck-loading'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
              </View>
              
              <View style={{flex: 5}}>
              <TextInputDefault
                editable={false} 
                selectTextOnFocus={false}
                label="Operação"
                style={styles.pickerinput}
                onChangeText={(text) =>
                  formik.setFieldValue("operationtypeid", text, true)
                }
                value={formik.values.operationtypeid = operation}
              />
              </View>
              <View style={{flex: 3}}>
                <RNPickerSelect
                  onValueChange={(value) => {setOperation(value);}}
                  useNativeAndroidPickerStyle={false}
                  items={operationItem}
              />
              </View>
            </View>

            <View style={styles.inputsection}>
              <FontAwesome5Icon
                name={'edit'}
                size={30}
                style={styles.iconstyle}
                color={'#023d6a'}
              />
              <TextInputDefault
                onFocus={() => formik.setTouched({ description: true })}
                onBlur={() => formik.setTouched({ description: false })}
                error={formik.errors.description && formik.touched.description}
                style={styles.input}
                label="Descrição"
                onChangeText={(text) =>
                  formik.setFieldValue("description", text, true)
                }
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <HelperText type="error" visible={formik.errors.description}>
                  {formik.errors.description}
                </HelperText>
              )}
            </View>
            <View style={{ flex: 0.09 ,paddingHorizontal: 32, marginBottom: 28, marginTop: 14 }} >
              <ButtonDefault
                label="Agendamento"
                mode="contained"
                onPress={() => {
                  formik.handleSubmit();
                  // const noEmptyInputs =
                  //   formik.values.email.length && formik.values.password.length;
                  // if (noEmptyInputs) {
                  //   const noErrors = 0;
                  //   if (Object.keys(formik.errors).length === noErrors) {
                  //     navigation.navigate("Onboarding");
                  //   }
                  // }
                }}
              />
            </View>
  
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      </>
    );
  }
  return(
    <>
        <View style={{ flexDirection: 'row', padding: 15, backgroundColor: '#023d6a' }}>
        <Pressable
          style={({ pressed }) => [
            { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Agendamento</Text>
      </View>
        <SafeAreaView
          style={{
            backgroundColor: colors.white,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: "space-around",
              }}
            >
            <Image
              source={coloricon}
              style={{ width: 200}}
              resizeMode="contain"
            />
            </View>
         </SafeAreaView>
         </>
  );
  
}

const styles = StyleSheet.create({
  rect: {
    flex: 1
  },
  rect_imageStyle_truck: {
    width: '100%',
    opacity: .4
  },
  inputsection: {
    height: 100,
    flex: 0.09,
    marginLeft: 20,
    marginRight: 20,
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
      color: '#fff',
      fontSize: 24
  },
  pickerinput: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 24
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff'
  },
});