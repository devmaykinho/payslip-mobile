import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Camera from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLogo } from "../../hooks/useLogo";

import CardOnGoingLoads from "../../components/CardOnGoingLoads";
import ButtonStatus from "../../components/ButtonStatus";
import Photo from "../../components/Camera";
import * as S from "./styles";

import { AcceptedLoadsParams, EnumStatus } from "../AcceptedLoads";

const OnGoingLoads: React.FC = ({ navigation, route }: any) => {
  const param = route.params;
  const { Logo, Icon_Menu } = useLogo();
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [idPhotoSelected, setIdPhotoSelected] = useState<number>();
  const [acceptedLoads, setAcceptedLoads] = useState<AcceptedLoadsParams>();
  const camRef = useRef(null);

  function handleSetShowCamera(id: number) {
    setIdPhotoSelected(id);
    setShowCamera(true);
  }

  async function takePicture() {
    if (camRef.current) {
      let data = await camRef.current?.takePictureAsync();

      let aux = {
        id: idPhotoSelected,
        data: data.uri,
      };

      let aux2 = [...photos];
      aux2[idPhotoSelected] = aux;

      setPhotos(aux2);
      setShowCamera(false);
    }
  }

  function deletePhoto() {
    photos[idPhotoSelected] = null;
    setShowCamera(false);
  }

  function cancel() {
    setShowCamera(false);
  }

  function updateStatus() {
    if (photos.length) {
      let res = photos.reduce((acc, actual) => acc || actual);

      if (res) {
        alert("Atualizar STATUS");
      }
    }
  }

  const handleShowMenu = () => {
    navigation.navigate("Menu");
  };

  useEffect(() => {
    if (param?.acceptedLoadsDetails) {
      console.log("acceptedLoadsDetails", param?.acceptedLoadsDetails);
      setAcceptedLoads(param?.acceptedLoadsDetails);
    }
  }, []);

  return (
    <S.Wrapper>
      {showCamera ? (
        <Photo
          camRef={camRef}
          cancel={cancel}
          takePicture={takePicture}
          deletePhoto={deletePhoto}
          photoSelected={photos[idPhotoSelected]}
        />
      ) : (
        <>
          <S.Logo>
            <TouchableOpacity
              style={{ justifyContent: "center", width: 50, height: "100%" }}
              onPress={handleShowMenu}
            >
              <S.MenuIcon source={Icon_Menu} />
            </TouchableOpacity>
            <S.Image source={Logo} />
          </S.Logo>

          <S.Header>
            <CardOnGoingLoads
              id={acceptedLoads?.ocNumber}
              client={acceptedLoads?.clientName}
              vehicle={acceptedLoads?.vehicleType}
              load={acceptedLoads?.vehicleCategory}
              weight={`${acceptedLoads?.weight || 0}Kg`}
              pallets={acceptedLoads?.pallet}
            />
          </S.Header>

          <S.Content>
            <S.Coleta>
              <View style={{width:'60%'}}>
                <S.H1>COLETA</S.H1>
                <S.H2 numberOfLines={1}>{acceptedLoads?.collectDate}</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.cdCity}</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.cdAddress}</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.cdCep}</S.H2>
              </View>
              <S.CameraWrapper>
                <S.Camera
                  color={photos[0] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(0)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[0] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>

                <S.Camera
                  color={photos[1] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(1)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[1] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>

                <S.Camera
                  color={photos[2] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(2)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[2] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>
              </S.CameraWrapper>
            </S.Coleta>

            <S.Entrega>
              <View>
                <S.H1>ENTREGA</S.H1>
                <S.H2 numberOfLines={1}>02/02/2022</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.clientCity}</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.clientAddress}</S.H2>
                <S.H2 numberOfLines={1}>{acceptedLoads?.clientCep}</S.H2>
              </View>
              <S.CameraWrapper>
                <S.Camera
                  color={photos[3] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(3)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[3] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>

                <S.Camera
                  color={photos[4] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(4)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[4] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>

                <S.Camera
                  color={photos[5] ? "#4fb14f" : "#000"}
                  onPress={() => handleSetShowCamera(5)}
                >
                  <Camera
                    name="photo-camera"
                    size={20}
                    color={photos[5] ? "#4fb14f" : "#000"}
                  />
                </S.Camera>
              </S.CameraWrapper>
            </S.Entrega>
          </S.Content>

          <S.DollarWrapper
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <S.Dollar color="#7e807e">
              <Icon name="dollar" size={12} color="#7e807e" />
            </S.Dollar>
            <View style={{ alignItems: "flex-end", paddingRight: 5 }}>
              <S.DollarText>Valor do Frete</S.DollarText>
              <S.H1>R$????</S.H1>
            </View>
          </S.DollarWrapper>

          <S.Footer>
            <S.Voltar>
              <ButtonStatus
                callback={() => navigation.navigate("AcceptedLoads")}
                color="#a6a6a6"
                title="VOLTAR"
              />
            </S.Voltar>

            <S.Status>
              <ButtonStatus
                callback={updateStatus}
                color="#56AEA5"
                title={
                  acceptedLoads?.scheduleStatudCod === EnumStatus.checkin
                    ? "checkin"
                    : acceptedLoads?.scheduleStatudCod === EnumStatus.checkout
                    ? "checkout"
                    : "conclude"
                }
              />
            </S.Status>
          </S.Footer>
        </>
      )}
    </S.Wrapper>
  );
};

export default OnGoingLoads;
