import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { createBarbershopFirebase } from '~/store/modules/barbershop/actions';

import {
  Container,
  ImageHeader,
  LogoHeader,
  InputForm,
  SubmitButton,
  Form,
  Title,
} from './styles';

class BarbershopData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      cnpj: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        zipCode: '',
        regionCode: '',
        complement: '',
      },
    };
  }

  register = () => {
    const { createBarbershopFirebase } = this.props;
    createBarbershopFirebase({ ...this.state });
  };

  render() {
    const { name, description, cnpj, address } = this.state;
    const { barbershop } = this.props;

    return (
      <Background>
        <Container>
          <LogoHeader>
            <ImageHeader source={BeardIcon} />
          </LogoHeader>
          <Form>
            <Title>Agora, preencha os dados e o endereço da barbearia!</Title>
            <InputForm
              placeholder="Nome da Barbearia"
              icon="person-outline"
              value={name}
              onChangeText={value => this.setState({ name: value })}
              autoCorrect={false}
            />
            <InputForm
              placeholder="Descrição"
              icon="person-outline"
              value={description}
              onChangeText={value => this.setState({ description: value })}
              autoCorrect={false}
            />
            <InputForm
              placeholder="CNPJ"
              icon="person-outline"
              value={cnpj}
              onChangeText={value => this.setState({ cnpj: value })}
              autoCorrect={false}
            />
            <Title>Endereço</Title>
            <InputForm
              icon="assignment-ind"
              placeholder="CEP"
              keyboardType="numeric"
              value={address.zipCode}
              onChangeText={value =>
                this.setState({ address: { ...address, zipCode: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="Rua"
              value={address.street}
              onChangeText={value =>
                this.setState({ address: { ...address, street: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="Numero"
              keyboardType="numeric"
              value={address.number}
              onChangeText={value =>
                this.setState({ address: { ...address, number: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="Complemento"
              value={address.complement}
              onChangeText={value =>
                this.setState({ address: { ...address, complement: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="Bairro"
              value={address.neighborhood}
              onChangeText={value =>
                this.setState({ address: { ...address, neighborhood: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="Cidade"
              value={address.city}
              onChangeText={value =>
                this.setState({ address: { ...address, city: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              icon="assignment-ind"
              placeholder="UF"
              value={address.regionCode}
              onChangeText={value =>
                this.setState({ address: { ...address, regionCode: value } })
              }
              autoCapitalize="none"
            />

            <SubmitButton
              loading={barbershop.loading}
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

BarbershopData.propTypes = {
  barbershop: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  createBarbershopFirebase: PropTypes.func,
};

BarbershopData.defaultProps = {
  createBarbershopFirebase: null,
  barbershop: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createBarbershopFirebase }, dispatch);

const mapStateToProps = state => ({
  barbershop: state.barbershop,
});

export default connect(mapStateToProps, mapDispatchToProps)(BarbershopData);
