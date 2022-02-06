import styled from "styled-components/native";

export const Wrapper = styled.View`
  padding-bottom: 15px;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 15px;
`;
export const Content = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 15px;
`;

export const Footer = styled.View``;

export const H1 = styled.Text`
  font-size: 16px;
  font-family: "Montserrat_600SemiBold";
`;

export const H2 = styled.Text`
  color: #595959;
  font-family: "Montserrat_300Light";
`;

export const Elipses = styled.Text`
  color: #595959;
  font-size: 35px;
`;

export const WrapperInfo = styled.View`
  width: 50%;
`;

export const WrapperButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
`;

export const WrapperButton = styled.View`
  flex: 1;
`;
