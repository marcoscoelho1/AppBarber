import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginFirebase, logOut } from '~/store/modules/auth/actions';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { navigation, loginFirebase, auth } = this.props;
    const { email, password } = this.state;

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
              value={email}
              onChangeText={value => this.setState({ email: value })}
            />
            <InputForm
              icon="lock-outline"
              placeholder="Senha"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={value => this.setState({ password: value })}
            />
            <SubmitButton
              onPress={() => loginFirebase(email, password)}
              loading={auth.loading}
            >
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
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  auth: PropTypes.any.isRequired,
  // logOut: PropTypes.any.isRequired,
  loginFirebase: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginFirebase, logOut }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
