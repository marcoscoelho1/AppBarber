import React from 'react';
import { connect } from 'react-redux';
// import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stars from 'react-native-stars';
import { StyleSheet } from 'react-native';

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
  BarberShopStarsContainer,
  CommentContainer,
} from './styles';

const stylesStar = StyleSheet.create({
  myStarStyle: {
    color: '#ea8d00',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 21,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});

function BarbershopResume({ barbershop, navigation }) {
  return (
    <Container>
      <HeaderImageBackground source={{ uri: barbershop.logoBarbershop }}>
        <Header>
          <BarbershopName>{barbershop.name}</BarbershopName>
          <BarberShopStarsContainer>
            <Stars
              default={barbershop.starsMedia}
              count={5}
              starSize={150}
              fullStar={<Icon name="star" style={[stylesStar.myStarStyle]} />}
              emptyStar={
                <Icon
                  name="star"
                  style={[stylesStar.myStarStyle, stylesStar.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name="star-half" style={[stylesStar.myStarStyle]} />
              }
              disabled
            />
          </BarberShopStarsContainer>
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
          {barbershop.comments.length > 0 ? (
            barbershop.comments.map(comment => (
              <CommentContainer>
                <SessionTitle>{comment.author}</SessionTitle>
                <BarberShopStarsContainer>
                  <Stars
                    default={comment.stars}
                    count={5}
                    starSize={150}
                    fullStar={
                      <Icon name="star" style={[stylesStar.myStarStyle]} />
                    }
                    emptyStar={
                      <Icon
                        name="star"
                        style={[
                          stylesStar.myStarStyle,
                          stylesStar.myEmptyStarStyle,
                        ]}
                      />
                    }
                    halfStar={
                      <Icon name="star-half" style={[stylesStar.myStarStyle]} />
                    }
                    disabled
                  />
                </BarberShopStarsContainer>
                <SessionText>{comment.comment}</SessionText>
              </CommentContainer>
            ))
          ) : (
            <SessionText>Ainda não há comentários</SessionText>
          )}
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
