import { View, Modal, Button, Image } from "react-native";
import React from "react";

export default function index({
  showModal,
  setShowModal,
  handleDelete,
  photoCaptured,
}) {
  
  return (
    // <Modal animationType="slide" transparent={false} visible={showModal}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          style={{ width: "100%", height: "92%" }}
          source={{ uri: photoCaptured }}
        />
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-around",
          }}
        >
          <View style={{ margin: 5, width: "100px" }}>
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>

          <View style={{ margin: 5 }}>
            <Button title="Excluir" onPress={handleDelete} />
          </View>
        </View>
      </View>
    // </Modal>
  );
}
