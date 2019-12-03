import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 16px;
  height: 51px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 1px #999;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #2e2d2d;
`;
