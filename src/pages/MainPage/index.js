import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stars from 'react-native-stars';
import { logOut } from '~/store/modules/auth/actions';
import { updateUser } from '~/store/modules/user/actions';

import {
  Container,
  MapContainer,
  ViewMap,
  BarberShopDetails,
  BarberShopDetailsLogo,
  BarberShopDetailsInfo,
  DetailsButton,
  BarbershopTitle,
  BarbershopAddress,
  BarberShopStarsContainer,
  mapStyle,
} from './styles';
import {
  updateBarbershop,
  selectBarbershopScheduling,
} from '~/store/modules/barbershop/actions';

const barbershopFirebase = firestore().collection('barbershops');
const userFirebase = firestore().collection('users');

const stylesStar = StyleSheet.create({
  myStarStyle: {
    color: '#ea8d00',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 16,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearBarberShops: [],
      initialCoords: {
        latitude: 0,
        longitude: 0,
      },
      detailsVisible: false,
      barbershopSelected: {
        name: '',
        address: '',
        description: '',
      },
      user: {},
      barbershopData: {},
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      this.setState({ initialCoords: { ...info.coords } }, () => {
        this.getBarbershopsAround(info.coords.longitude);
      });
    });

    this.getUser();
  }

  getBarbershopsAround = lng => {
    barbershopFirebase
      .where('coordinates.lng', '<=', lng + 0.5)
      .where('coordinates.lng', '>=', lng - 0.5)
      .limit(50)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { nearBarberShops } = this.state;
          this.setState({
            nearBarberShops: [...nearBarberShops, doc.data()],
          });
        });
      });
  };

  getUser = () => {
    const { auth, updateUser } = this.props;

    userFirebase.where('uid', '==', auth.data.uid).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.tron.log('doooocUser', doc);

        this.setState(
          {
            user: { ...doc.data(), documentId: doc.id },
          },
          () => {
            const { user } = this.state;
            updateUser(user);
            if (user.type === 'barber') {
              this.getBarbershopData();
            }
          }
        );
      });
    });
  };

  getBarbershopData = () => {
    const { auth, updateBarbershop } = this.props;

    barbershopFirebase
      .where('uid', '==', auth.data.uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.tron.log('doooocBarbershop', doc);

          this.setState(
            {
              barbershopData: { ...doc.data() },
            },
            () => {
              const { barbershopData } = this.state;
              updateBarbershop(barbershopData);
            }
          );
        });
      });
  };

  setBabershopSelected = barbershop => {
    const { selectBarbershopScheduling } = this.props;

    this.setState({
      barbershopSelected: { ...barbershop },
    });

    selectBarbershopScheduling({ ...barbershop });

    this.handleShowDetailsVisible();
  };

  handleShowDetailsVisible = () => {
    this.setState({
      detailsVisible: true,
    });
  };

  handleCloseDetailsVisible = () => {
    this.setState({
      detailsVisible: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      detailsVisible,
      barbershopSelected,
      initialCoords,
      nearBarberShops,
    } = this.state;

    return (
      <Container>
        <MapContainer>
          <ViewMap
            customMapStyle={mapStyle}
            loadingEnabled
            initialRegion={{
              latitude:
                initialCoords.latitude !== 0
                  ? initialCoords.latitude
                  : -23.1929053,
              longitude:
                initialCoords.longitude !== 0
                  ? initialCoords.longitude
                  : -47.3146839,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onPress={() => {
              this.handleCloseDetailsVisible();
            }}
          >
            {nearBarberShops.map((barberShop, indexBarbershop) => (
              <ViewMap.Marker
                key={indexBarbershop}
                coordinate={{
                  latitude: barberShop.coordinates.lat,
                  longitude: barberShop.coordinates.lng,
                }}
                onPress={() => {
                  this.setBabershopSelected(barberShop);
                }}
              />
            ))}
          </ViewMap>
          {detailsVisible && (
            <BarberShopDetails>
              <BarberShopDetailsLogo>
                <Avatar
                  size="large"
                  rounded
                  source={{ uri: barbershopSelected.logoBarbershop }}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                />
              </BarberShopDetailsLogo>
              <BarberShopDetailsInfo>
                <BarbershopTitle>{barbershopSelected.name}</BarbershopTitle>
                <BarberShopStarsContainer>
                  <Stars
                    default={barbershopSelected.starsMedia}
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
                <BarbershopAddress>{`Rua: ${barbershopSelected.address.street}, ${barbershopSelected.address.number}`}</BarbershopAddress>
                <DetailsButton
                  onPress={() => {
                    navigation.navigate('BarbershopResume');
                  }}
                >
                  Ver Detalhes
                </DetailsButton>
              </BarberShopDetailsInfo>
            </BarberShopDetails>
          )}
        </MapContainer>
      </Container>
    );
  }
}

MainPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateUser: PropTypes.func,
  updateBarbershop: PropTypes.func,
  selectBarbershopScheduling: PropTypes.func,
  auth: PropTypes.any,
};

MainPage.defaultProps = {
  auth: null,
  updateUser: null,
  selectBarbershopScheduling: null,
  updateBarbershop: null,
};

MainPage.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Menu');
      }}
    >
      <Icon name="menu" size={40} color="#fff" style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logOut, updateUser, updateBarbershop, selectBarbershopScheduling },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
