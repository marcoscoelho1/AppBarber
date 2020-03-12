import styled from 'styled-components';

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10% 16px;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  padding: 16px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: #6a4e4a;
  width: 100%;
`;

export const HeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 21px;
  color: #fff;
`;

export const ModalBody = styled.ScrollView`
  flex: 1;
  background: #fff;
  width: 100%;
`;
