import styled from "styled-components/native";

export const WrapperLogo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 60px;
  background-color: #1f2a4c;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 15px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 40px;
`;

export const MenuIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const WrapperInfoUser = styled.View`
  padding: 0 15px;
  background-color: #202a4c;
`;

export const UserName = styled.Text`
  font-size: 19px;
  color: #fff;
  font-family: "Montserrat_300Light";
  margin-bottom: 5px;
`;

export const UserPhone = styled.Text`
  font-size: 19px;
  color: #8e919b;
  font-family: "Montserrat_300Light";
`;

export const Vehicle = styled.Text`
  font-size: 19px;
  font-family: "Montserrat_300Light";
  color: #8e919b;
  margin-bottom: 15px;
`;

export const Ul = styled.View`
  flex: 1;
`;

export const Li = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 0;
`;

export const LiItem = styled.Text`
  font-size: 17px;
  color: #000;
  font-family: "Montserrat_300Light";
`;

export const LiItemDisable = styled.Text`
  font-size: 17px;
  color: #afabab;
  font-family: "Montserrat_300Light";
`;

export const LiItemIcon = styled.View`
  width: 25px;
  margin: 0 5px;
  margin-left: 15px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`;

export const Logout = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 0 30px 5px;
`;

export const LiItemLogout = styled.Text`
  font-size: 19px;
  color: #ff0000;
  font-family: "Montserrat_300Light";
  font-weight: 700;
`;
