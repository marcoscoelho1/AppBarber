import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
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
  FormRow,
  Title,
  AddButton,
  RemoveButton,
} from './styles';

const newService = {
  description: '',
  time: '',
  amount: '',
};

class BarbershopServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [{ ...newService }],
    };
  }

  componentDidUpdate(prevProps) {
    const { barbershop, navigation } = this.props;

    if (prevProps.barbershop.data !== barbershop.data) {
      navigation.navigate('MainPage');
    }
  }

  addService = () => {
    const { services } = this.state;
    this.setState({
      services: [...services, { ...newService }],
    });
  };

  removeService = index => {
    const { services } = this.state;
    const arrayServices = services;

    arrayServices.splice(index, 1);

    this.setState({
      services: [...arrayServices],
    });
  };

  handleServiceChange = (field, serviceIndex, value) => {
    const { services } = this.state;

    const updateServices = services;
    updateServices[serviceIndex][field] = value;

    this.setState({
      services: [...updateServices],
    });
  };

  register = () => {
    const { services } = this.state;
    const { createBarbershopFirebase, barbershop } = this.props;
    const barberShopComplete = { ...barbershop.data, services: [...services] };
    createBarbershopFirebase({ ...barberShopComplete });
  };

  render() {
    const { services } = this.state;
    const { barbershop } = this.props;

    return (
      <Background>
        <Container>
          <LogoHeader>
            <ImageHeader source={BeardIcon} />
          </LogoHeader>
          <Form>
            <Title>
              Para finalizar, informe quais são os serviços oferecidos pela
              barbearia!
            </Title>
            {services.map((service, index) => (
              <FormRow key={`service${index}`} style={{ marginBottom: 16 }}>
                <FormRow>
                  <InputForm
                    placeholder="Descrição do Serviço"
                    value={service.description}
                    onChangeText={value =>
                      this.handleServiceChange('description', index, value)
                    }
                    autoCorrect={false}
                  />
                </FormRow>
                <FormRow DisplayRow>
                  <InputForm
                    placeholder="Tempo em minutos"
                    value={service.time}
                    onChangeText={value =>
                      this.handleServiceChange('time', index, value)
                    }
                    autoCorrect={false}
                    style={{ marginRight: 4, width: '50%' }}
                  />
                  <InputForm
                    placeholder="Valor"
                    value={service.amount}
                    onChangeText={value =>
                      this.handleServiceChange('amount', index, value)
                    }
                    autoCorrect={false}
                    style={{ marginLeft: 4, width: '50%' }}
                  />
                </FormRow>
                {services.length > 1 && (
                  <FormRow style={{ alignItems: 'flex-end' }}>
                    <RemoveButton onPress={() => this.removeService(index)}>
                      <Icon name="delete" size={21} color="#fff" />
                      <Text style={{ fontSize: 21 }}>Remover</Text>
                    </RemoveButton>
                  </FormRow>
                )}
              </FormRow>
            ))}
            <FormRow style={{ alignItems: 'flex-end' }}>
              <AddButton
                onPress={() => {
                  this.addService();
                }}
              >
                <Icon name="add" size={21} color="#fff" />
                <Text style={{ fontSize: 21 }}>Adicionar</Text>
              </AddButton>
            </FormRow>

            <SubmitButton
              style={{ alignSelf: 'stretch' }}
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

BarbershopServices.propTypes = {
  barbershop: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  createBarbershopFirebase: PropTypes.func,
};

BarbershopServices.defaultProps = {
  createBarbershopFirebase: null,
  barbershop: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createBarbershopFirebase }, dispatch);

const mapStateToProps = state => ({
  barbershop: state.barbershop,
});

export default connect(mapStateToProps, mapDispatchToProps)(BarbershopServices);
