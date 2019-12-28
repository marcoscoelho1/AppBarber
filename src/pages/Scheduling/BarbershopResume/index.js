import React from 'react';
import { connect } from 'react-redux';
// import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  HeaderImageBackground,
  Header,
  BarbershopName,
  BarbershopAddress,
  SessionMainContainer,
  SessionContainer,
  SessionTitle,
  // SessionSubTitle,
  SessionText,
  FloatingButton,
} from './styles';

function BarbershopResume({ barbershop, navigation }) {
  return (
    <Container>
      <HeaderImageBackground source={{ uri: barbershop.logoBarbershop }}>
        <Header>
          <BarbershopName>{barbershop.name}</BarbershopName>
          <BarbershopAddress>
            {`${barbershop.address.street}, ${barbershop.address.number} - ${barbershop.address.neighborhood}, ${barbershop.address.city} - ${barbershop.address.regionCode}`}
          </BarbershopAddress>
        </Header>
      </HeaderImageBackground>
      <SessionMainContainer>
        <SessionContainer>
          <SessionTitle>Sobre a barbearia</SessionTitle>
          <SessionText>{barbershop.description}</SessionText>
        </SessionContainer>
        <SessionContainer>
          <SessionTitle>Fotos</SessionTitle>
          <SessionText>Ainda não há fotos</SessionText>
        </SessionContainer>
        <SessionContainer>
          <SessionTitle>Avaliações e comentários</SessionTitle>
          <SessionText>Ainda não há comentários</SessionText>
        </SessionContainer>
      </SessionMainContainer>
      <FloatingButton onPress={() => navigation.navigate('ServicesSelection')}>
        <Icon name="today" size={40} color="#fff" />
      </FloatingButton>
    </Container>
  );
}

BarbershopResume.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  barbershop: PropTypes.any,
};

BarbershopResume.defaultProps = {
  barbershop: null,
};

BarbershopResume.navigationOptions = () => ({
  title: 'Barbearia',
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

export default connect(mapStateToProps, null)(BarbershopResume);
