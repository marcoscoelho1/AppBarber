import React from 'react';

import BeardIcon from '~/assets/images/beard_icon_white.png';
import Background from '~/assets/images/Background.png';

import {
  Container,
  ImageHeader,
  LogoHeader,
  InputForm,
  SubmitButton,
  Form,
  SignIn,
  SignInText,
  ImgBackground,
} from './styles';

export default function Login() {
  return (
    <ImgBackground source={Background}>
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
          <SubmitButton onPress={() => {}}>Entrar</SubmitButton>
          <SignIn>
            <SignInText>Cadastre-se</SignInText>
          </SignIn>
        </Form>
      </Container>
    </ImgBackground>
  );
}
