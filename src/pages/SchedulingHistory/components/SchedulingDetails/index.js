import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import firestore from '@react-native-firebase/firestore';
import { Text, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import { updateBarbershopFirebase } from '~/store/modules/barbershop/actions';
import Button from '~/components/Button';
import Modal from '~/components/Modal';

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
  AvaliationContainer,
  InputForm,
  StarsContainer,
  ConfirmButton,
  ConfirmText,
} from './styles';

const stylesStar = StyleSheet.create({
  myStarStyle: {
    color: '#ea8d00',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 45,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});

const barbershopFirebase = firestore().collection('barbershops');

class SchedulingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      starsNumber: 0,
      showAvaliationModal: false,
      barbershopData: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { details } = navigation.state.params;
    this.getBarbershopDataId(details.barbershopId);
  }

  getBarbershopDataId = barbershopId => {
    barbershopFirebase
      .where('uid', '==', barbershopId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            barbershopData: { ...doc.data(), documentId: doc.id },
          });
        });
      });
  };

  handleShowAvaliationModal = () => {
    const { showAvaliationModal } = this.state;
    this.setState({
      showAvaliationModal: !showAvaliationModal,
    });
  };

  evaluateBarbershop = () => {
    const { updateBarbershopFirebase, user } = this.props;
    const { barbershopData, starsNumber, comment } = this.state;
    const barbershopDataObj = { ...barbershopData };
    barbershopDataObj.starsTotal += starsNumber;
    barbershopDataObj.avaliationsNumber += 1;
    barbershopDataObj.starsMedia =
      barbershopDataObj.starsTotal / barbershopDataObj.avaliationsNumber;
    barbershopDataObj.comments = [
      ...barbershopDataObj.comments,
      { author: user.data.name, stars: starsNumber, comment },
    ];

    console.tron.log('vamoooos la', barbershopDataObj);
    updateBarbershopFirebase(barbershopDataObj);

    this.handleShowAvaliationModal();
  };

  render() {
    const { navigation } = this.props;
    const { details } = navigation.state.params;
    const {
      barbershopData,
      showAvaliationModal,
      comment,
      starsNumber,
    } = this.state;
    console.tron.log('barbershopData', barbershopData);

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
        <Button
          onPress={() => {
            this.handleShowAvaliationModal();
          }}
        >
          <Text>Avaliar Serviço</Text>
        </Button>
        {showAvaliationModal && (
          <Modal
            title="Avaliação Barbearia"
            modalVisible={showAvaliationModal}
            onClose={this.handleShowAvaliationModal}
            confirm={this.handleShowAvaliationModal}
          >
            <AvaliationContainer>
              <StarsContainer>
                <Stars
                  default={starsNumber}
                  count={5}
                  update={val => {
                    this.setState({ starsNumber: val });
                  }}
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
                />
              </StarsContainer>

              <InputForm
                placeholder="Comentário"
                value={comment}
                onChangeText={value => {
                  this.setState({ comment: value });
                }}
                autoCorrect={false}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                style={{ height: 102, alignItems: 'flex-start' }}
              />

              <ConfirmButton
                title="Confirmar"
                onPress={() => this.evaluateBarbershop()}
              >
                <ConfirmText>Confirmar</ConfirmText>
              </ConfirmButton>
            </AvaliationContainer>
          </Modal>
        )}
      </Container>
    );
  }
}

SchedulingDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.any,
  }).isRequired,
  updateBarbershopFirebase: PropTypes.func,
  user: PropTypes.any,
};

SchedulingDetails.defaultProps = {
  updateBarbershopFirebase: null,
  user: null,
};

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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateBarbershopFirebase }, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulingDetails);
