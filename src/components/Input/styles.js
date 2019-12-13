import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

export const Container = styled.View`
  padding: 0 16px;
  min-height: 51px;
  background: #fff;
  flex-direction: row;
  align-items: flex-end;
  border: solid 1px #999;
`;

export const InputContainer = styled.View`
  flex: 1;
  background: #fff;
`;
export const LabelInput = styled.Text`
  left: ${props => (props.icon ? `-21px` : '0px')};
  font-size: 12px;
  color: #999;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
  color: #2e2d2d;
  padding: 0px;
`;

export const MInput = styled(TextInputMask).attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
  color: #2e2d2d;
  padding: 0px;
`;
