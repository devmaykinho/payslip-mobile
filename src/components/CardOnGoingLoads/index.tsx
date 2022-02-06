import React from "react";
import { View, TouchableOpacity, Modal, Pressable, Text } from "react-native";
import * as S from "./styles";
import { useLogo } from "../../hooks/useLogo";

export type CardOnGoingLoadsProps = {
  id: string;
  client: string;
  vehicle: string;
  load: string;
  weight: string;
  pallets: string;
};

const ocurrences = [
  { name: "CLIENTE AUSENTE" },
  { name: "CLIENTE RECUSA RECEBER" },
  { name: "CLIENTE RECUSA CARREGAR" },
  { name: "DEVOLUÇÃO TOTAL" },
  { name: "DEVOLUÇÃO PARCIAL" },
  { name: "DIVERGENCIA DE VOLUME" },
  { name: "DIVERGENCIA DE PREÇO" },
  { name: "DIVERGENCIA DE PRAZO" },
  { name: "DIVERGENCIA NO PEDIDO" },
  { name: "VEÍCULO QUEBRADO" },
  { name: "VEÍCULO LOTADO" },
  { name: "ATRASO PARA CHEGADA" },
  { name: "ACIDENTE NO TRAJETO" },
  { name: "MERCADORIA DANIFICADA" },
  { name: "PALETIZAÇÃO INCORRETA" },
  { name: "RISCO DE AVARIA" },
  { name: "ENDEREÇO INCORRETO" },
];

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const CardOnGoingLoads: React.FC<CardOnGoingLoadsProps> = (props) => {
  const { ocorrencia_icon } = useLogo();
  const [modalVisible, setModalVisible] = React.useState(false);

  const renderItem = ({ item }) => <Item title={item.name} />;

  return (
    <S.Wrapper>
      <S.Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <S.ListOcurrence
          data={ocurrences}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.name}
        />
        <S.ModalClose onPress={() => setModalVisible(!modalVisible)}>
          <S.ModalCloseText>X</S.ModalCloseText>
        </S.ModalClose>
      </S.Modal>

      <S.Header>
        <S.ViewTitle>
          <S.Title2>Detalhamento do Frete</S.Title2>
          <S.ID>
            ID <S.IDNumber>{props.id}</S.IDNumber>
          </S.ID>
        </S.ViewTitle>

        <S.WrapperInfoItem>
          <View>
            <S.H2>Cliente</S.H2>
            <S.Client>{props.client}</S.Client>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              paddingTop: 10,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <S.Image source={ocorrencia_icon} />
            <S.InfoOcurrence>Informar Ocorrência</S.InfoOcurrence>
          </TouchableOpacity>
        </S.WrapperInfoItem>
      </S.Header>

      <S.Content>
        <View style={{ paddingLeft: 15, marginBottom: -10 }}>
          <S.H2>Detalhes da Carga</S.H2>
        </View>

        <S.WrapperInfo>
          <S.WrapperDescription>
            <S.H2>Veículo</S.H2>
            <S.H1>{props.vehicle}</S.H1>
          </S.WrapperDescription>

          <S.WrapperDescription>
            <S.H2>Carga</S.H2>
            <S.H1>{props.load}</S.H1>
          </S.WrapperDescription>

          <S.WrapperDescription>
            <S.H2>Peso</S.H2>
            <S.H1>{props.weight}</S.H1>
          </S.WrapperDescription>

          <S.WrapperDescription>
            <S.H2>Pallets</S.H2>
            <S.H1>{props.pallets}</S.H1>
          </S.WrapperDescription>
        </S.WrapperInfo>
      </S.Content>
    </S.Wrapper>
  );
};

export default CardOnGoingLoads;
