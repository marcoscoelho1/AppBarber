import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  updateSchedule,
  addScheduleFirebase,
} from '~/store/modules/schedule/actions';
import Button from '~/components/Button';

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
} from './styles';

function ServicesSelection({ schedule, addScheduleFirebase, navigation }) {
  return (
    <Container>
      <ScrollContainer>
        <Title>Data e Horário:</Title>
        <DateContainer>
          <Icon name="event" size={40} color="#ea8d00" />
          <DateText>
            {format(schedule.data.date, "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            })}
          </DateText>
        </DateContainer>
        <HourContainer>
          <Icon name="alarm" size={40} color="#ea8d00" />
          <HourText>{schedule.data.time}</HourText>
        </HourContainer>
        <Title>Servicos:</Title>
        {schedule.data.services.map((service, index) => (
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
          </ServiceContainer>
        ))}
      </ScrollContainer>
      <Button
        onPress={() => {
          addScheduleFirebase();
          navigation.navigate('MainPage');
        }}
      >
        <Text>Confirmar</Text>
      </Button>
    </Container>
  );
}

ServicesSelection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  schedule: PropTypes.any,
  addScheduleFirebase: PropTypes.func,
};

ServicesSelection.defaultProps = {
  schedule: null,
  addScheduleFirebase: null,
};

ServicesSelection.navigationOptions = () => ({
  title: 'Resumo',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  schedule: state.schedule,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSchedule, addScheduleFirebase }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServicesSelection);
