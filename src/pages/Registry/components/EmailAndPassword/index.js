import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { registerFirebase } from '~/store/modules/auth/actions';

import {
  Container,
  ImageHeader,
  LogoHeader,
  InputForm,
  SubmitButton,
  Form,
  Title,
} from './styles';

class EmailAndPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { auth, navigation } = this.props;

    if (prevProps.auth.data.uid !== auth.data.uid) {
      navigation.navigate('UserType');
    }
  }

  register = () => {
    const { email, password } = this.state;
    const { registerFirebase } = this.props;
    registerFirebase(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    return (
      <Background>
        <Container>
          <LogoHeader>
            <ImageHeader source={BeardIcon} />
          </LogoHeader>
          <Form>
            <Title>Primeiramente, informe um e-mail e senha</Title>
            <InputForm
              placeholder="E-mail"
              icon="mail-outline"
              keyboardType="email-address"
              value={email}
              onChangeText={value => this.setState({ email: value })}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <InputForm
              icon="lock-outline"
              placeholder="Senha"
              value={password}
              onChangeText={value => this.setState({ password: value })}
              secureTextEntry
              autoCapitalize="none"
            />
            <SubmitButton
              loading={auth.loading}
              onPress={() => {
                this.register();
              }}
            >
              Próximo
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}

EmailAndPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  registerFirebase: PropTypes.func,
  auth: PropTypes.any,
};

EmailAndPassword.defaultProps = {
  registerFirebase: null,
  auth: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ registerFirebase }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailAndPassword);
