import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
`;

export const LogoHeader = styled.View`
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const ImageHeader = styled.Image`
  width: 73px;
  height: 84px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 21px;
  margin-bottom: 16px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  background: transparent;
`;

export const FormRow = styled.View`
  flex-direction: ${props => (props.DisplayRow ? `row` : 'column')};
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  background: transparent;
`;

export const InputForm = styled(Input)`
  margin-bottom: 8px;
`;

export const SubmitButton = styled(Button)`
  margin: 15px 0px 30px 0px;
  align-self: stretch;
`;

export const AddButton = styled(Button)`
  margin: 15px 0px 30px 0px;
  width: 50%;
`;

export const RemoveButton = styled(Button)`
  width: 50%;
  background-color: #ee3342;
  font-size: 16px;
`;
