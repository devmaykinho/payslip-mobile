import styled, { css } from "styled-components/native";

export type ButtonProps = {
  bgColor: "#1F2A4E" | "#FFFFFF" | "transparent";
};

export type TextProps = {
  color: "#1F2A4E" | "#FFFFFF" | "transparent";
};

export const Button = styled.View<ButtonProps>`
  ${({ bgColor }) => css`
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: ${bgColor};
    padding: 15px;
    border: solid 1px ${bgColor === "#FFFFFF" ? "#1F2A4E" : "transparent"};
  `}
`;

export const Text = styled.Text<TextProps>`
  ${({ color }) => css`
    color: ${color};
    font-size: 14px;
    font-family: "Montserrat_300Light";
  `}
`;
