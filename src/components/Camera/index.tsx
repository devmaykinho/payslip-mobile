import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { Camera as Photo } from "expo-camera";
import Camera from "react-native-vector-icons/MaterialIcons";
import * as S from "./styles";

export default function index({
  camRef,
  takePicture,
  cancel,
  deletePhoto,
  photoSelected,
}) {
  const [hasPermission, setHasPermission] = useState(null);

  function handleDelete() {
    deletePhoto(photoSelected);
  }

  function handleCancel() {
    cancel();
  }

  useEffect(() => {
    async function run() {
      const { status } = await Photo.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      Photo.Constants.AutoFocus.off
    }

    run();
  }, []);

  if (hasPermission === null) return <View />;

  if (!hasPermission) return <Text>Permissão negada</Text>;

  return (
    <S.Wrapper>
      {photoSelected?.data ? (
        <S.PreviewImage>
          <Image
            style={{ width: "100%", height: "92%" }}
            source={{ uri: photoSelected?.data }}
          />
          <S.WrapperButtons>
            <S.TouchbleOpacity onPress={handleCancel}>
              <S.Button color="transparent">Voltar</S.Button>
            </S.TouchbleOpacity>

            <S.TouchbleOpacity onPress={handleDelete}>
              <S.Button color="transparent">Excluir</S.Button>
            </S.TouchbleOpacity>
          </S.WrapperButtons>
        </S.PreviewImage>
      ) : (
        <>
          <Photo style={{ flex: 1 }} ref={camRef} />
          <S.IconPickture>
            <S.Photo color="#7f7f7f" onPress={takePicture}>
              <Camera name="photo-camera" size={30} color="#7f7f7f" />
            </S.Photo>

            <S.TouchbleOpacity onPress={cancel}>
              <S.Text>Voltar</S.Text>
            </S.TouchbleOpacity>
          </S.IconPickture>
        </>
      )}
    </S.Wrapper>
  );
}
