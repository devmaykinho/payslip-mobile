import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text,SafeAreaView, Pressable, Alert, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements'
import { CardSchedule } from "./components";
import {Card} from 'react-native-shadow-cards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './server/api';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TextInputDefault, ButtonDefault, ButtonDanger,ButtonSuccess } from "./components";
import { useLogo } from "./hooks/useLogo";
import { useNavigation } from "@react-navigation/native";
import Config from './Config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function AcceptedList() {
  const [allocations, setAllocations] = useState([]);
  const navigation = useNavigation();
  const { coloricon } = useLogo();
  const [exampledata,setExampledata] = useState([]);
  // const exampledata = [{
  //     allocation:{
  //       driverId: 33,
  //       driverTelephone: "123456789",
  //       id: 8,
  //       leaderName: "João",
  //       leaderTelephone: "114567 8900",
  //       operation: {
  //         description: "TRANSFERENCIA",
  //         id: 8,
  //       },
  //       vehicles: {
  //         id: 9,
  //         plate: "ABC9877",
  //         vehicleCategoryType: {
  //           id: 4,
  //           name: "SECO",
  //         },
  //         vehicleShippingCompany: {
  //           id: 49,
  //           name: "TRASPORTADORA TESTE",
  //         },
  //       },
  //     },
  //     cds: {
  //       cd: "1984",
  //       city: "CABO DE SANTO AGOSTI",
  //       id: 27,
  //     },
  //     client: {
  //       id: 207,
  //       name: "1 - MAYCON TESTE APP ",
  //       plant: {
  //         description: "ARACARIGUAMA",
  //         id: 5,
  //       },
  //     },
  //     endTime: "20:40",
  //     observation: "moving test",
  //     scheduleId: 196,
  //     dischargeDate: "10/11/2021",
  //     startTime: "14:10",
  //     weight: "24.55"
  //   }];

  useEffect(() => {
    getschedule();
  }, [allocations]);

  const getschedule = async() =>{
    const userid = await AsyncStorage.getItem("userId");
    const response = await api().get(`/api/schedule/awainting-agrees/${userid}`);
    if(response.status == 200){
      setExampledata(response.data.result);
    }
  }
  const acceptschedule = async(value) => {
    const userid = await AsyncStorage.getItem("userId");
    const response = await api().put(`/api/schedule/agrees`, JSON.stringify({scheduleId: value,userId: Number(userid)}));
    if(response.status == 200){
      console.log(response.data);
    }
  }
  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
      }
    return result;
  }
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
        <Text style={styles.headerText}>Programações</Text>
      </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
          keyExtractor={()=>makeid(15)}
          data={exampledata}
          renderItem={({ item }) => {
            return (
              <SafeAreaView style={{flex: 1}}>
                <Card 
                style={{padding: 10, margin: 10, flex: 1}}
                elevation={10}
                cornerRadius={15}
                >
                    <View style={styles.row}>
                      <View style={{flex: 0.15, height: 50}}>
                        <Image
                          source={coloricon}
                          style={{ width: 50,height:50}}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{flex: 0.6, height: 80, flexDirection: 'column'}}>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 20,color: '#023d6a'}}>{item.observation}</Text>
                        </View>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 14,color: '#023a66'}}>Carregamento em {item.dischargeDate}</Text>
                        </View>
                      </View>
                      <View style={{flex: 0.25, height: 50}}>
                        <Button
                          icon={<FontAwesome5Icon
                            name={'ellipsis-h'}
                            size={20}
                            style={styles.iconstyle}
                            color={'#023d6a'}
                          />}
                          type="clear"
                          onPress={async() => {
                            // await AsyncStorage.setItem("scheduledata", JSON.stringify(item));
                            // navigation.navigate("AcceptedScreen");
                            console.log(item);
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={{flex: 0.5, height: 50, flexDirection: 'column'}}>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 14,color: '#023d6a'}}>Origem</Text>
                        </View>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 18,}}>{item.cds.city}</Text>
                        </View>
                      </View>
                      <View style={{flex: 0.5, height: 50, flexDirection: 'column'}}>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 14,color: '#023d6a'}}>Origem</Text>
                        </View>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 18,}}>{item.client.plant.description}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={{flex: 0.5, height: 50}}>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 14,color: '#023d6a'}}>Peso</Text>
                        </View>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 18,}}>{item.weight}</Text>
                        </View>
                      </View>
                      <View style={{flex: 0.5, height: 50}}>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 14,color: '#023d6a'}}>Cliente</Text>
                        </View>
                        <View style={{flex: 0.5, height: 25}}>
                          <Text style={{fontSize: 18,}}>{item.client.name}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={{flex: 0.4, height: 50}}>
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
                      <View style={{flex: 0.6, height: 50}}>
                        <ButtonSuccess
                          labelStyle={{ color: '#fff' }}
                          label="Aceitar"
                          mode="contained"
                          style={{borderRadius: 0}}
                          onPress={() => {
                            acceptschedule(item.scheduleId);
                          }}
                        />
                      </View>
                    </View>
                </Card>
    
            </SafeAreaView>
            );
          }}
        />
        
      </> 
      );
  
}

const styles = StyleSheet.create({
  row: {
    flex: 0.25,
    marginTop: 10,
    flexDirection: 'row'
  },
  iconstyle: {
      padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff'
  },
  
});














  // <SafeAreaView style={{flex:1}}>
  //   <Card 
  //   style={{padding: 10, margin: 10,flex:1}}
  //   elevation={10}
  //   cornerRadius={15}
  //   >
  //     <View style={{flex:0.25,flexDirection: 'column'}}>
  //       <View style={styles.route}>
  //         <FontAwesome5Icon
  //           name={'map-marker-alt'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#df4759'}
  //         />
  //         <Text>{item.cds.city}</Text>
  //       </View>
  //       <View style={styles.arrow}>
  //         <FontAwesome5Icon
  //           name={'long-arrow-alt-down'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <FontAwesome5Icon
  //           name={'long-arrow-alt-down'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <FontAwesome5Icon
  //           name={'long-arrow-alt-down'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //       </View>
  //       <View style={styles.route}>
  //         <FontAwesome5Icon
  //           name={'map-marker-alt'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#3ec78b'}
  //         />
  //         <Text style={{fontSize: 16}}>{item.client.plant.description}</Text>
  //       </View>
  //     </View>

  //     <View style={{flex:0.25,flexDirection: 'row'}}>
  //       <View style={styles.inputsection}>
  //         <FontAwesome5Icon
  //           name={'business-time'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <Text>{item.dischargeDate}, {item.startTime} ~ {item.endTime}</Text>
  //       </View>
  //       <View style={styles.inputsection}>
  //         <FontAwesome5Icon
  //           name={'truck-moving'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <Text>{item.allocation.vehicles.vehicleCategoryType.name}</Text>
  //       </View>
  //     </View>


  //     <View style={{flex:0.25,flexDirection: 'row'}}>
  //       <View style={styles.inputsection}>
  //         <FontAwesome5Icon
  //           name={'user-tie'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <Text>{item.client.name}</Text>
  //       </View>
  //       <View style={styles.inputsection}>
  //         <FontAwesome5Icon
  //           name={'cog'}
  //           size={30}
  //           style={styles.iconstyle}
  //           color={'#023d6a'}
  //         />
  //         <Text>{item.allocation.operation.description}</Text>
  //       </View>
  //     </View>
  //     <View style={{flex:0.25,flexDirection: 'row'}}>
  //       <View style={styles.inputsection}>
  //       <ButtonSuccess
  //           labelStyle={{ color: '#fff' }}
  //           label="Aceitar"
  //           mode="contained"
  //           onPress={() => {
  //             acceptschedule(item.scheduleId);
  //           }}
  //         />
  //       </View>
  //       <View style={styles.inputsection}>
  //       <ButtonDefault
  //           labelStyle={{ color: '#fff' }}
  //           label="Veja detalhes"
  //           mode="contained"
  //           onPress={async() => {
  //             await AsyncStorage.setItem("scheduledata", JSON.stringify(item));
  //             navigation.navigate("AcceptedScreen");
  //           }}
  //         />
  //       </View>
  //       <View style={styles.inputsection}>
  //       <ButtonDanger
  //           labelStyle={{ color: '#fff' }}
  //           label="Rejeitar"
  //           mode="contained"
  //           onPress={() => {
  //           }}
  //         />
  //       </View>
  //     </View>
  //   </Card>

  // </SafeAreaView>