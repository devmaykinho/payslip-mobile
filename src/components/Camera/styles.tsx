import styled, { css } from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #1f2a4e;
`;

export const PreviewImage = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Photo = styled.TouchableOpacity<CameraProps>`
  ${({ color }) => css`
    padding: 5px;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    border: solid 2px ${color};
  `}
`;

export const IconPickture = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #1f2a4e;
  padding: 10px;
`;

type CameraProps = {
  color: string;
};
export const Camera = styled.View<CameraProps>`
  ${({ color }) => css`
    padding: 5px;
    border-radius: 50px;
    height: 35px;
    width: 35px;
    border: solid 2px ${color};
  `}
`;

export const CameraWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  flex: 0.55;
`;

export const Text = styled.Text`
  margin: 20px 0 10px 0;
  color: #7f7f7f;
`;

export const TouchbleOpacity = styled.TouchableOpacity``;

export const WrapperButtons = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
`;

type ButtonsProps = { color: string };
export const Button = styled.Text<ButtonsProps>`
  ${({ color }) => css`
    width: 100px;
    margin: 0 10px;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background-color: ${color};
  `}
`;
