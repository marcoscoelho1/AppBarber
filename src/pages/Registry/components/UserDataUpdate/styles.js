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
  padding: 32px 0px;
`;

export const InputForm = styled(Input)`
  margin-bottom: 8px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  align-self: stretch;
`;

export const AvatarContainer = styled.View`
  margin-bottom: 32px;
`;
