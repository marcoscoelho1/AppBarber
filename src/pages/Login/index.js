import React from 'react';

import PropTypes from 'prop-types';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';

import {
  Container,
  ImageHeader,
  LogoHeader,
  InputForm,
  SubmitButton,
  Form,
  SignIn,
  SignInText,
} from './styles';

export default function Login({ navigation }) {
  return (
    <Background>
      <Container>
        <LogoHeader>
          <ImageHeader source={BeardIcon} />
        </LogoHeader>
        <Form>
          <InputForm
            placeholder="E-mail"
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <InputForm
            icon="lock-outline"
            placeholder="Senha"
            secureTextEntry
            autoCapitalize="none"
          />
          <SubmitButton onPress={() => navigation.navigate('SignUp')}>
            Entrar
          </SubmitButton>
          <SignIn onPress={() => navigation.navigate('EmailAndPassword')}>
            <SignInText>Cadastre-se</SignInText>
          </SignIn>
        </Form>
      </Container>
    </Background>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
