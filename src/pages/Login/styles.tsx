import styled, { css } from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 30px 25px 0 25px;
  background-color: #ffffff;
`;

export const Logo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 14px;
  height: 60px;
  background-color: #1f2a4c;
`;

export const Image = styled.Image`
  width: 120px;
  height: 40px;
`;

export const MenuIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const WrapperHeader = styled.View``;
export const Title = styled.Text`
  font-size: 19px;
  color: #000;
  font-family: "Montserrat_300Light";
`;

export const SubTitle = styled(Title)`
  margin-top: 15px;
`;

export const WrapperContent = styled.View``;
export const WrapperFooter = styled.View``;

type InputTextProps = { hasError: boolean };
export const TextInput = styled.TextInput<InputTextProps>`
  ${({ hasError }) => css`
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-color: ${hasError ? "#f00" : "#7f7f7f"};
    height: auto;
    padding: 0 5px;
    margin: 10px 0;
    font-size: 16px;
    font-family: "Montserrat_300Light";
    color: #5f5f5f;
  `}
`;
