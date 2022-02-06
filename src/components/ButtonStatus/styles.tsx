import styled, { css } from "styled-components/native";

export type ButtonProps = {
  color: "#56AEA5" | "#a6a6a6" | "transparent";
};

export const Button = styled.View<ButtonProps>`
  ${({ color }) => css`
    width: 100%;
    height: 45px;
    justify-content: center;
    align-items: center;
    background-color: ${color};
    padding: 10px 0;
    font-size: 14px;
    font-family: "Montserrat_300Light";
  `}
`;

export const Text = styled.Text`
  ${() => css`
    font-size: 14px;
    color: #fff;
    font-family: "Montserrat_300Light";
    text-transform: uppercase;
  `}
`;
