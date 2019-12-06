import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { updateUser } from '~/store/modules/user/actions';

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

  register = () => {
    const { updateUser } = this.props;
    updateUser({ ...this.state });

    /*
    const { name, cpf, birthDate, cellphone } = this.state;
    const { registerFirebase } = this.props;
    registerFirebase(email, password); */
  };

  render() {
    const { name, cpf, birthDate, cellphone } = this.state;

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
              icon="person-outline"
              value={name}
              onChangeText={value => this.setState({ name: value })}
              autoCorrect={false}
            />
            <InputForm
              icon="assignment-ind"
              placeholder="CPF"
              keyboardType="numeric"
              value={cpf}
              onChangeText={value => this.setState({ cpf: value })}
              autoCapitalize="none"
            />
            <InputForm
              icon="date-range"
              placeholder="Data de Nascimento"
              keyboardType="numeric"
              value={birthDate}
              onChangeText={value => this.setState({ birthDate: value })}
              autoCapitalize="none"
            />
            <InputForm
              icon="call"
              placeholder="Celular"
              keyboardType="numeric"
              value={cellphone}
              onChangeText={value => this.setState({ cellphone: value })}
              autoCapitalize="none"
            />
            <SubmitButton
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateUser: PropTypes.func,
};

UserData.defaultProps = {
  updateUser: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser }, dispatch);

export default connect(null, mapDispatchToProps)(UserData);
