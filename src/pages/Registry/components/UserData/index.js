import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { createUserFirebase } from '~/store/modules/user/actions';

import {
  Container,
  ImageHeader,
  LogoHeader,
  InputForm,
  SubmitButton,
  Form,
  Title,
} from './styles';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cpf: '',
      birthDate: '',
      cellphone: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { user, navigation } = this.props;
    if (prevProps.user.data !== user.data) {
      if (user.data.type === 'barber') {
        navigation.navigate('BarbershopData');
      } else {
        navigation.navigate('MainPage');
      }
    }
  }

  register = () => {
    const { createUserFirebase } = this.props;
    createUserFirebase({ ...this.state });
    /*
    if (user.data.type === 'barber') {
      navigation.navigate('BarbershopData');
    } else {
      navigation.navigate('MainPage');
    }


    const { name, cpf, birthDate, cellphone } = this.state;
    const { registerFirebase } = this.props;
    registerFirebase(email, password); */
  };

  render() {
    const { name, cpf, birthDate, cellphone } = this.state;
    const { user } = this.props;

    return (
      <Background>
        <Container>
          <LogoHeader>
            <ImageHeader source={BeardIcon} />
          </LogoHeader>
          <Form>
            <Title>Informe seus dados pessoais!</Title>
            <InputForm
              placeholder="Nome Completo"
              value={name}
              onChangeText={value => this.setState({ name: value })}
              autoCorrect={false}
            />
            <InputForm
              placeholder="CPF"
              keyboardType="numeric"
              value={cpf}
              onChangeText={value => {
                this.setState({ cpf: value });
              }}
              autoCapitalize="none"
              mask="[000].[000].[000]-[00]"
            />
            <InputForm
              placeholder="Data de Nascimento"
              keyboardType="numeric"
              value={birthDate}
              onChangeText={value => this.setState({ birthDate: value })}
              autoCapitalize="none"
              mask="[00]/[00]/[0000]"
            />
            <InputForm
              placeholder="Celular"
              keyboardType="numeric"
              value={cellphone}
              onChangeText={value => this.setState({ cellphone: value })}
              autoCapitalize="none"
              mask="([00])[00000]-[0000]"
            />
            <SubmitButton
              loading={user.loading}
              onPress={() => {
                this.register();
              }}
            >
              Continuar
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}

UserData.propTypes = {
  user: PropTypes.any.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  createUserFirebase: PropTypes.func,
};

UserData.defaultProps = {
  createUserFirebase: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createUserFirebase }, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
