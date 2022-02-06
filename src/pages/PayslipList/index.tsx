import React, { useEffect, useState } from "react";
import CardAcceptedLoads from "../../components/CardAcceptedLoads";
import Api from "../../server/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Linking, ToastAndroid } from "react-native"

import * as S from "./styles";
import { useLogo } from "../../hooks/useLogo";
import { TouchableOpacity } from "react-native";

export enum EnumStatus {
  checkin = "CI",
  checkout = "ARRI",
  conclude = "AE",
}

export type AcceptedLoadsParams = {
  id: string,
  userAuthId: string,
  startDatePeriod: string,
  endDatePeriod: string,
  paymentDate: string,
  paymentMonth: string,
  paymentType: string,
  urlFile: string
};

const AcceptedLoads: React.FC = ({ navigation }: any) => {
  const { Logo, Icon_Menu } = useLogo();
  const [acceptedLoads, setAcceptedLoads] = useState<AcceptedLoadsParams[]>();

  const handleUpdateStatus = async (id: string) => {
    alert('maycon')
  };

  const handleOpenPayslip = async (url) => {
    await Linking.openURL(url);
  }

  const handleShowMenu = () => {
    navigation.navigate("Menu");
  };

  useEffect(() => {
    async function run() {
      try {
        const userId = await AsyncStorage.getItem("userAuthId");
        const response = await Api().post("payslip/list", { 
          userAuthId: userId,
          year: "20222"
        });
        if (response.status == 200) {
          const { data } = response;
          setAcceptedLoads(data);
        }
      } catch (error) {
        ToastAndroid.show(`Não foi possível localizar os holerites`, ToastAndroid.LONG);
      }
    }
    run();
  }, []);

  return (
    <>
      <S.Logo>
        <TouchableOpacity
          style={{ justifyContent: "center", width: 70, height: "100%" }}
          onPress={handleShowMenu}
        >
          <S.MenuIcon source={Icon_Menu} />
        </TouchableOpacity>
        {/* <S.Image source={Logo} /> */}
      </S.Logo>

      <S.Wrapper>
        <S.Header>
          <S.Title>Meus Holerites</S.Title>
        </S.Header>

        <S.Content>
          {acceptedLoads &&
            acceptedLoads.map((item) => (
              <CardAcceptedLoads
                key={item.id}
                id={item.id}
                month={item.paymentMonth}
                paymentDate={item.paymentDate}
                paymentType={item.paymentType}
                payslipUrl={item.urlFile}
                handleUpdateStatus={handleUpdateStatus}
                handleOpenPayslip={handleOpenPayslip}
              />
            ))}
        </S.Content>
      </S.Wrapper>
    </>
  );
};

export default AcceptedLoads;
