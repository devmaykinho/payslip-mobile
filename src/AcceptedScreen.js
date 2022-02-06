import React, { useEffect, useState } from "react";
import { View, 
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image } from "react-native";
import {
  Title,
  useTheme,
  HelperText,
  Caption,
  Text,
  Subheading,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TextInputDefault, ButtonDefault, ButtonDanger,ButtonSuccess } from "./components";
import { useLogo } from "./hooks/useLogo";
import { Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './Config';
import api from './server/api';

export function AcceptedScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { coloricon } = useLogo();
  const [allocations, setAllocations] = useState(null);
  
  
  let data = [];
  useEffect(() => {
    getscheduledata();
  }, [])

  const getscheduledata = async() =>{
    const scheduledata = await AsyncStorage.getItem("scheduledata");
    data = JSON.parse(scheduledata);
    console.log(data);
    setAllocations(data);
  }
  const acceptschedule = async(value) => {
    const userid = await AsyncStorage.getItem("userId");
    const response = await api().put(`/api/schedule/agrees`, JSON.stringify({scheduleId: value,userId: Number(userid)}));
    if(response.status == 200){
      console.log(response.data);
    }
  }
  if(allocations){
    return (
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
        <Text style={styles.headerText}>Detalhes da programação</Text>
      </View>
      <SafeAreaView style={{flex:1, flexDirection: 'column'}}>
        <View style={styles.row}>
          <View style={{flex:0.2,height: 100}}>
            <Image
              source={coloricon}
              style={{ width: '100%',height:'100%'}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex:0.55,height: 100,flexDirection: 'column'}}>
            <View style={styles.half}>
              <Text style={{fontSize: 16}}>Cliente</Text>
            </View>
            <View style={styles.half}>
              <Text style={{fontSize: 20,color: '#023d6a'}}>{allocations.client.name}</Text>
            </View>
          </View>
          <View style={{flex:0.25,height: 100}}>
            <Button
              title={'Ver na mapa'}
              type="clear"
              onPress={async() => {
                await AsyncStorage.setItem("scheduledata", JSON.stringify(item));
                navigation.navigate("AcceptedScreen");
              }}
            />
          </View>
        </View>
        <View style={{flex:0.1,height: 100, flexDirection: 'row', margin: 20}}>
          <Text style={{fontSize: 28}}>Detalhes da Carga</Text>
        </View>
        <View style={styles.row}>
          <View style={{flex:0.15,height: 100,flexDirection: 'column'}}>
            <View style={styles.half}>
              <Text style={{fontSize: 16}}>Peso</Text>
            </View>
            <View style={styles.half}>
              <Text style={{fontSize: 20, color: '#023d6a'}}>{allocations.weight}</Text>
            </View>
          </View>
          <View style={{flex:0.35,height: 100,flexDirection: 'column'}}>
            <View style={styles.half}>
              <Text style={{fontSize: 16}}>Veículo</Text>
            </View>
            <View style={styles.half}>
              <Text style={{fontSize: 20, color: '#023d6a'}}>{allocations.allocation.vehicles.vehicleCategoryType.name}</Text>
            </View>
          </View>
          <View style={{flex:0.35,height: 100,flexDirection: 'column'}}>
            <View style={styles.half}>
              <Text style={{fontSize: 16}}>Carga</Text>
            </View>
            <View style={styles.half}>
              <Text style={{fontSize: 20, color: '#023d6a'}}>Refrigerada</Text>
            </View>
          </View>
          <View style={{flex:0.15,height: 100,flexDirection: 'column'}}>
            <View style={styles.half}>
              <Text style={{fontSize: 16}}>Pallets</Text>
            </View>
            <View style={styles.half}>
              <Text style={{fontSize: 20, color: '#023d6a'}}>25</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{flex:0.6,height: 100,flexDirection: 'column'}}>
            <View style={{flex:0.2,height: 20}}>
              <Text style={{fontSize: 16}}>Caleta</Text>
            </View>
            <View style={{flex:0.8,height: 80,flexDirection: 'column'}}>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>{allocations.cds.city}</Text>
              </View>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>Av. da Praia, 289</Text>
              </View>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>CEP 03990-000</Text>
              </View>
            </View>
          </View>
          <View style={{flex:0.4,height: 100}}>
            <View style={{flex:0.3,height: 30}}></View>
            <View style={{flex:0.3,height: 30}}>
              <Text style={{fontSize: 20}}>
                <FontAwesome5Icon
                  name={'calendar-check'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
                  {allocations.dischargeDate}
              </Text>
            </View>
            <View style={{flex:0.3,height: 30}}></View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{flex:0.6,height: 100,flexDirection: 'column'}}>
            <View style={{flex:0.2,height: 20}}>
              <Text style={{fontSize: 16}}>Entrega</Text>
            </View>
            <View style={{flex:0.8,height: 80,flexDirection: 'column'}}>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>{allocations.client.plant.description}</Text>
              </View>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>Av. da Praia, 289</Text>
              </View>
              <View style={{flex:0.3,height: 25}}>
                <Text style={{fontSize: 20, color: '#023d6a'}}>CEP 03990-000</Text>
              </View>
            </View>
          </View>
          <View style={{flex:0.4,height: 100,flexDirection: 'column'}}>
            <View style={{flex:0.3,height: 30}}></View>
            <View style={{flex:0.3,height: 30}}>
              <Text style={{fontSize: 20}}>
                <FontAwesome5Icon
                  name={'calendar-check'}
                  size={30}
                  style={styles.iconstyle}
                  color={'#023d6a'}
                />
                  {allocations.dischargeDate}
              </Text>
            </View>
            <View style={{flex:0.3,height: 30}}></View>
          </View>
        </View>
        {/* <View style={styles.row}>
          <View style={{flex:0.3,height: 100}}>
            <FontAwesome5Icon
              name={'file-invoice-dollar'}
              size={30}
              style={styles.iconstyle}
              color={'#023d6a'}
            />
          </View>
          <View style={{flex:0.7,height: 100}}>
              <Text style={{fontSize: 28, color: '#023d6a'}}>Frete Valar R$ 445.60</Text>
          </View>
        </View> */}
        <View style={styles.row}>
          <View style={{flex:0.4,height: 100}}>
            <ButtonDefault
              labelStyle={{ color: '#fff' }}
              color={'#808080'}
              label="Rejeitar"
              mode="contained"
              style={{borderRadius: 0}}
              onPress={() => {
              }}
            />
          </View>
          <View style={{flex:0.6,height: 100}}>
            <ButtonSuccess
              labelStyle={{ color: '#fff' }}
              label="Aceitar"
              mode="contained"
              style={{borderRadius: 0}}
              onPress={() => {
                acceptschedule(allocations.scheduleId);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
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
        <Text style={styles.headerText}>Detalhes da programação</Text>
      </View></>
    );
}

const styles = StyleSheet.create({
  row: {
    flex:0.15,
    height: 100, 
    flexDirection: 'row',
    margin: 20
  },
  half: {
    flex:0.5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconstyle: {
      padding: 10,
  },
  button: {
    height: 84,
    flex: 1,
    padding: 10
    
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff'
  },
  
});








// <View style={{flex:0.1,flexDirection: 'row'}}>
// <View style={styles.inputsection}>
//   <FontAwesome5Icon
//     name={'map-marker-alt'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#df4759'}
//   />
//   <Text>{allocations[0]['cds']['city']}</Text>
// </View>
// <View style={styles.arrow}>
//   <FontAwesome5Icon
//     name={'long-arrow-alt-right'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
// </View>
// <View style={styles.inputsection}>
//   <FontAwesome5Icon
//     name={'map-marker-alt'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#3ec78b'}
//   />
//   <Text style={{fontSize: 16}}>{allocations[0]['client']['plant']['description']}</Text>
// </View>
// </View>

// <View style={{flex:0.1,flexDirection: 'row'}}>
// <View style={styles.inputsection}>
//   <ButtonDefault
//       labelStyle={{ color: '#fff' }}
//       label="Ver Rota"
//       mode="contained"
//       onPress={() => {
//         navigation.navigate("RouteView");
//       }}
//     />
// </View>
// </View>
// <View style={{flex:0.2,flexDirection: 'column'}}>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'calendar-check'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Data da descarga:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].dischargeDate}</Text>
// </View>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'clock'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Horário Inicial:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].startTime}</Text>
// </View>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'clock'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Horário Final:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].endTime}</Text>
// </View>
// </View>


// <View style={{flex:0.4,flexDirection: 'column'}}>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'user-tie'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Embarcador Nome:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].client.name}</Text>
// </View>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'truck-moving'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Tipo de Veículo:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].allocation.vehicles.vehicleCategoryType.name}</Text>
// </View>
// <View style={styles.timesection}>
//   <FontAwesome5Icon
//     name={'cog'}
//     size={30}
//     style={styles.iconstyle}
//     color={'#023d6a'}
//   />
//   <Text>Operação:</Text>
//   <Text>&nbsp; &nbsp; &nbsp; {allocations[0].allocation.operation.description}</Text>
// </View>
// </View>
// <View style={{flex:0.2,flexDirection: 'row'}}>
// <View style={styles.button}>
// <ButtonSuccess
//     labelStyle={{ color: '#fff' }}
//     label="Aceitar"
//     mode="contained"
//     onPress={() => {
//       acceptschedule(allocations.scheduleId);
//     }}
//   />
// </View>
// <View style={styles.button}>
// <ButtonDanger
//     labelStyle={{ color: '#fff' }}
//     label="Rejeitar"
//     mode="contained"
//     onPress={() => {
//     }}
//   />
// </View>
// </View>