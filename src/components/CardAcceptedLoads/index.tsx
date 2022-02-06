import React from "react";
import * as S from "./styles";

export type CardAcceptedLoadsProps = {
  id: string;
  month: string
  paymentDate: string
  paymentType: string
  payslipUrl: string
  handleUpdateStatus: (id: string) => void;
  handleOpenPayslip: (url: string) => void;
};

const CardAcceptedLoads: React.FC<CardAcceptedLoadsProps> = (params) => {
  const month = [
    '',
    'Janeiro', 
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setempro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const year = params.paymentDate.split('-')[0]
  return (
    <S.Wrapper>
      <S.Header onPress={() => params.handleOpenPayslip(params.payslipUrl)}>
        <S.WrapperInfo>
          <S.H1>{`${month[params.id]} - ${year}`}</S.H1>
        </S.WrapperInfo>
        <S.Elipses>...</S.Elipses>
      </S.Header>

      <S.Content onPress={() => params.handleOpenPayslip(params.payslipUrl)}>
        <S.WrapperInfo>
          <S.H2>Tipo</S.H2>
          <S.H1>{params.paymentType}</S.H1>
        </S.WrapperInfo>
        <S.WrapperInfo>
          <S.H2>Data Pagamento</S.H2>
          <S.H1>{params.paymentDate}</S.H1>
        </S.WrapperInfo>        
      </S.Content>

      <S.Footer>
        <S.WrapperButtons>
        </S.WrapperButtons>
      </S.Footer>
    </S.Wrapper>
  );
};

export default CardAcceptedLoads;
