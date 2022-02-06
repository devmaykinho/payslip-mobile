import React from "react";
import { useLogo } from "../../hooks/useLogo";
import * as S from "./styles";

type BaseProps = {
  children: any;
};

const Base: React.FC<BaseProps> = ({ children }) => {
  const { Fundo_Acesso } = useLogo();
  return (
    <S.Wrapper>
      <S.ImageBackground source={Fundo_Acesso}>
        <S.Container>{children}</S.Container>
      </S.ImageBackground>
    </S.Wrapper>
  );
};

export default Base;
