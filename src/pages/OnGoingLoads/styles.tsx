import styled, { css } from "styled-components/native";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  border-bottom-color: #eaeaea;
`;

export const Header = styled.View`
  padding-bottom: 0px;
`;

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

export const Content = styled.View`
  border-bottom-width: 5px;
  border-bottom-color: #eaeaea;
`;

type CameraProps = {
  color: string;
};
export const Camera = styled.TouchableOpacity<CameraProps>`
  ${({ color }) => css`
    padding: 5px;
    margin: 0 3px;
    border-radius: 50px;
    height: 35px;
    width: 35px;
    border: solid 2px ${color};
  `}
`;

export const CameraWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Coleta = styled.View`
  margin-top: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
`;

export const Entrega = styled(Coleta)``;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
`;

export const DollarWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
export const Dollar = styled(Camera)`
  align-items: center;
  width: 25px;
  height: 25px;
  font-weight: 700;
  margin-left: 2px;
`;

export const DollarText = styled.Text`
  color: #484747;
  font-size: 14px;
  font-family: "Montserrat_300Light";
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Voltar = styled.View`
  width: 40%;
`;

export const Status = styled.View`
  width: 60%;
`;

export const H1 = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_600SemiBold";
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const H2 = styled.Text`
  color: #595959;
  font-family: "Montserrat_300Light";
`;

export const Client = styled(H1)`
  text-transform: uppercase;
  font-size: 20px;
`;

export const WrapperInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  margin-top: 15px;
`;

export const WrapperInfoItem = styled.View``;

export const WrapperButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperButton = styled.View`
  width: 32%;
`;
