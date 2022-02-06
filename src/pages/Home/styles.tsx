import styled from "styled-components/native";

export const Wrapper = styled.View`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  background-color: #1F2A4E;
  padding: 10px 20px;
`;

export const ImageBackground = styled.View`
  height: 100%;
  justify-content: flex-end;

`;

export const ContentHome = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextHome = styled.Text`
  color: #FFF;
  font-size: 40px;
  margin-top: 100px;
`

export const TextHomeBold = styled(TextHome)`
  font-weight: bold;
`