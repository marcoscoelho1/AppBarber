import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropType from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import {
  Container,
  ScrollContainer,
  ServiceContainer,
  ServiceLine,
  ServiceText,
  InfoContainer,
  Title,
} from './styles';

class ServicesSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedServices: [],
    };
  }

  checkService = service => {
    const { checkedServices } = this.state;
    const arrayCheckedServices = checkedServices;
    arrayCheckedServices.push(service);

    this.setState({
      checkedServices: [...arrayCheckedServices],
    });
  };

  uncheckService = service => {
    const { checkedServices } = this.state;
    const arrayCheckedServices = checkedServices;
    arrayCheckedServices.splice(service, 1);

    this.setState({
      checkedServices: [...arrayCheckedServices],
    });
  };

  render() {
    const { barbershop } = this.props;
    const { checkedServices } = this.state;

    return (
      <Container>
        <ScrollContainer>
          <Title>Selecione um serviço:</Title>
          {barbershop.services.map((service, index) => (
            <ServiceContainer key={index}>
              <InfoContainer>
                <ServiceLine>
                  <Icon name="store" size={40} color="#ea8d00" />
                  <ServiceText>{service.description}</ServiceText>
                </ServiceLine>
                <ServiceLine>
                  <Icon name="alarm" size={40} color="#ea8d00" />
                  <ServiceText>{`${service.time} minutos`}</ServiceText>
                </ServiceLine>
                <ServiceLine>
                  <Icon name="monetization-on" size={40} color="#ea8d00" />
                  <ServiceText>{service.amount}</ServiceText>
                </ServiceLine>
              </InfoContainer>
              <CheckBox
                checked={checkedServices.indexOf(service) > -1}
                onPress={() => {
                  if (checkedServices.indexOf(service) === -1) {
                    this.checkService(service);
                  } else {
                    this.uncheckService(service);
                  }
                }}
                containerStyle={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                  borderBottomColor: '#fff',
                }}
                checkedColor="#ea8d00"
                size={40}
              />
            </ServiceContainer>
          ))}
        </ScrollContainer>
        <Button>
          <Text>Continuar</Text>
        </Button>
      </Container>
    );
  }
}

ServicesSelection.propTypes = {
  barbershop: PropType.any,
};

ServicesSelection.defaultProps = {
  barbershop: null,
};

ServicesSelection.navigationOptions = () => ({
  title: 'Serviços',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  barbershop: state.barbershop.data.barbershopSelected,
});

export default connect(mapStateToProps, null)(ServicesSelection);
