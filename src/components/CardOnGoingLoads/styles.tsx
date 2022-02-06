import styled from "styled-components/native";

export const Wrapper = styled.View``;

export const Header = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
`;
export const Content = styled.View`
  margin-bottom: 10px;
`;

export const H1 = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_600SemiBold";
  text-transform: uppercase;
`;

export const H2 = styled.Text`
  color: #595959;
  padding: 10px 0 5px 0;
  font-family: "Montserrat_300Light";
  font-size: 16px;
`;

export const InfoOcurrence = styled.Text`
  color: #595959;
  font-family: "Montserrat_300Light";
  font-size: 16px;
`;

export const ViewTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
  padding: 10px 15px 15px 15px;
`;

export const Title2 = styled.Text`
  margin-top: 5px;
  font-size: 16px;
  font-family: "Montserrat_600SemiBold";
`;

export const ID = styled.Text`
  margin-top: 5px;
  font-size: 16px;
  font-family: "Montserrat_300Light";
  color: #000;
`;

export const IDNumber = styled.Text`
  font-size: 16px;
  font-family: "Montserrat_600SemiBold";
  color: #000;
`;

export const Client = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_600SemiBold";
  text-transform: uppercase;
`;

export const WrapperInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
  width: 100%;
  padding: 0 15px;
`;

export const WrapperInfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 0 15px;
`;

export const WrapperDescription = styled.View`
  margin-bottom: 10px;
`;

export const Image = styled.Image`
  width: 45px;
  height: 20px;
  margin-right: 5px;
`;

export const ListOcurrence = styled.FlatList`
  width: 120px;
  height: 40px;
`;

export const Modal = styled.Modal`
`;

export const ModalClose = styled.Pressable`
  background-color: greenyellow;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ModalCloseText = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`;
