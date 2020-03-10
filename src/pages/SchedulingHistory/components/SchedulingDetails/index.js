import React from 'react';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  ScrollContainer,
  ServiceContainer,
  ServiceLine,
  ServiceText,
  InfoContainer,
  DateContainer,
  HourContainer,
  DateText,
  HourText,
  Title,
  BarbershopName,
  BarbershopAddress,
  BarbershopAddressContainer,
} from './styles';

function SchedulingDetails({ navigation }) {
  const { details } = navigation.state.params;

  return (
    <Container>
      <ScrollContainer>
        <BarbershopName>{details.barbershopName}</BarbershopName>
        <BarbershopAddressContainer>
          <Icon name="location-on" size={30} color="#ea8d00" />
          <BarbershopAddress>
            {`${details.barbershopAddress.street}, ${details.barbershopAddress.number}\n${details.barbershopAddress.neighborhood}, ${details.barbershopAddress.city} - ${details.barbershopAddress.regionCode}`}
          </BarbershopAddress>
        </BarbershopAddressContainer>
        <Title>Data e Horário:</Title>
        <DateContainer>
          <Icon name="event" size={30} color="#ea8d00" />
          <DateText>
            {format(details.date.toDate(), "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            })}
          </DateText>
        </DateContainer>
        <HourContainer>
          <Icon name="alarm" size={30} color="#ea8d00" />
          <HourText>{details.time}</HourText>
        </HourContainer>
        <Title>Servicos:</Title>
        {details.services.map((service, index) => (
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
          </ServiceContainer>
        ))}
      </ScrollContainer>
    </Container>
  );
}

SchedulingDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.any,
  }).isRequired,
};

SchedulingDetails.defaultProps = {};

SchedulingDetails.navigationOptions = () => ({
  title: 'Detalhe do Agendamento',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

export default SchedulingDetails;
