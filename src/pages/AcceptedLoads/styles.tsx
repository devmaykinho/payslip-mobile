import styled from "styled-components/native";

export const Logo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0  12px 0 14px;
  height: 60px;
  background-color: #1f2a4c;
`;

export const Image = styled.Image`
  width: 120px;
  height: 40px;
`;


export const MenuIcon = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 10px 0 0 0;
  background-color: #fff;
`;

export const Header = styled.View``;

export const ImageLogo = styled.Image`
  position: absolute;
  width: 40px;
  height: 40px;
  top: -10px;
  left: 0;
  z-index: 999999;

`;

export const Content = styled.ScrollView`
  max-height: 86.5%;
  margin: 10px 0 0 0;
`;

export const Title = styled.Text`
  font-size: 16px; 
  font-family: "Montserrat_600SemiBold";
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
  padding: 10px 0 15px 15px ;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-family: "Montserrat_600SemiBold";

  height: 55px;
  background-color: #1f2a4e;
  color: #fff;
`;
