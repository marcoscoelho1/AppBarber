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
  FormRow,
  Title,
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

  addService = () => {
    const { services } = this.state;
    this.setState({
      services: [...services, { ...newService }],
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
    const { createBarbershopFirebase } = this.props;
    createBarbershopFirebase({ ...this.state });
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
              <FormRow key={`service${index}`}>
                <InputForm
                  placeholder="Descrição do Serviço"
                  value={service.description}
                  onChangeText={value =>
                    this.handleServiceChange('description', index, value)
                  }
                  autoCorrect={false}
                />
                <InputForm
                  placeholder="Tempo em minutos"
                  value={service.time}
                  onChangeText={value =>
                    this.handleServiceChange('time', index, value)
                  }
                  autoCorrect={false}
                />
                <InputForm
                  placeholder="Valor"
                  value={service.amount}
                  onChangeText={value =>
                    this.handleServiceChange('amount', index, value)
                  }
                  autoCorrect={false}
                />
              </FormRow>
            ))}
            <SubmitButton
              onPress={() => {
                this.addService();
              }}
            >
              Adicionar
            </SubmitButton>

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
