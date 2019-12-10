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

export const Form = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: transparent;
`;

export const InputForm = styled(Input)`
  margin-bottom: 8px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  align-self: stretch;
`;

export const SignIn = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const SignInText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
