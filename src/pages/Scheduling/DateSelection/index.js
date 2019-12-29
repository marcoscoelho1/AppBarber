import React, { Component } from 'react';
import { Text } from 'react-native';
import DateInput from '~/components/DateInput';

import { Container } from './styles';

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

  render() {
    const { date } = this.state;
    console.tron.log('daaate', date);
    return (
      <Container>
        <Text>Agendamento</Text>
        <DateInput date={date} onChange={this.setDate} />
      </Container>
    );
  }
}

export default DateSelection;
