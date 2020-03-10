import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import uuid4 from 'uuid/v4';
import { updateSchedule } from '~/store/modules/schedule/actions';
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
    const indexRemove = arrayCheckedServices.indexOf(service);
    arrayCheckedServices.splice(indexRemove, 1);

    this.setState({
      checkedServices: [...arrayCheckedServices],
    });
  };

  saveServices = () => {
    const { updateSchedule, user, barbershop, navigation } = this.props;
    const { checkedServices } = this.state;
    updateSchedule({
      id: uuid4(),
      clientId: user.uid,
      clientName: user.name,
      barbershopId: barbershop.uid,
      barbershopName: barbershop.name,
      barbershopAddress: barbershop.address,
      services: checkedServices,
    });

    navigation.navigate('DateSelection');
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
                  <Icon name="store" size={30} color="#ea8d00" />
                  <ServiceText>{service.description}</ServiceText>
                </ServiceLine>
                <ServiceLine>
                  <Icon name="alarm" size={30} color="#ea8d00" />
                  <ServiceText>{`${service.time} minutos`}</ServiceText>
                </ServiceLine>
                <ServiceLine>
                  <Icon name="monetization-on" size={30} color="#ea8d00" />
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
                size={30}
              />
            </ServiceContainer>
          ))}
        </ScrollContainer>
        <Button
          onPress={() => {
            this.saveServices();
          }}
        >
          <Text>Continuar</Text>
        </Button>
      </Container>
    );
  }
}

ServicesSelection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  user: PropTypes.any,
  barbershop: PropTypes.any,
  updateSchedule: PropTypes.func,
};

ServicesSelection.defaultProps = {
  user: null,
  barbershop: null,
  updateSchedule: null,
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
  user: state.user.data,
  barbershop: state.barbershop.data.barbershopSelected,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSchedule }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServicesSelection);
