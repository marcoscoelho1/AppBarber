import React, { Component } from 'react';
// import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateSchedule } from '~/store/modules/schedule/actions';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title, TitleAgendamento } from './styles';

const hours = [
  {
    time: '9:00',
    available: true,
  },
  {
    time: '10:00',
    available: true,
  },
  {
    time: '11:00',
    available: true,
  },
  {
    time: '12:00',
    available: true,
  },
  {
    time: '13:00',
    available: true,
  },
  {
    time: '14:00',
    available: true,
  },
  {
    time: '15:00',
    available: true,
  },
  {
    time: '16:00',
    available: true,
  },
  {
    time: '17:00',
    available: true,
  },
  {
    time: '18:00',
    available: true,
  },
  {
    time: '19:00',
    available: true,
  },
  {
    time: '20:00',
    available: true,
  },
];

class DateSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  setDate = date => {
    this.setState({
      date,
    });
  };

  setDateAndTimeSchedule = time => {
    const { date } = this.state;
    const { updateSchedule, navigation } = this.props;

    updateSchedule({ time, date });
    navigation.navigate('ResumeScheduling');
  };

  render() {
    const { date } = this.state;
    return (
      <Container>
        <TitleAgendamento>Selecione uma data e horário:</TitleAgendamento>
        <DateInput date={date} onChange={this.setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => {
                this.setDateAndTimeSchedule(item.time);
              }}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    );
  }
}

DateSelection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateSchedule: PropTypes.func,
};

DateSelection.defaultProps = {
  updateSchedule: null,
};

DateSelection.navigationOptions = () => ({
  title: 'Agendamento',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSchedule }, dispatch);

export default connect(null, mapDispatchToProps)(DateSelection);
