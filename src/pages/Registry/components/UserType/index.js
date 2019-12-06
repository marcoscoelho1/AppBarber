import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateUser } from '~/store/modules/user/actions';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';

import {
  Container,
  ImageHeader,
  LogoHeader,
  BarberButton,
  ClientButton,
  Form,
  Title,
} from './styles';

function UserType({ updateUser, navigation }) {
  return (
    <Background>
      <Container>
        <LogoHeader>
          <ImageHeader source={BeardIcon} />
        </LogoHeader>
        <Form>
          <Title>Você é cliente ou barbeiro?</Title>
          <ClientButton
            onPress={() => {
              updateUser({ type: 'client' });
            }}
          >
            Cliente
          </ClientButton>
          <BarberButton
            onPress={() => {
              updateUser({ type: 'barber' });
              navigation.navigate('UserData');
            }}
          >
            Barbeiro
          </BarberButton>
        </Form>
      </Container>
    </Background>
  );
}

UserType.propTypes = {
  updateUser: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

UserType.defaultProps = {
  updateUser: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser }, dispatch);

export default connect(null, mapDispatchToProps)(UserType);
