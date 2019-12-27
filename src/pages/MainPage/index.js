import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import MapView from 'react-native-maps';
import { Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { logOut } from '~/store/modules/auth/actions';
import { updateUser } from '~/store/modules/user/actions';
import Button from '~/components/Button';

import {
  Container,
  MapContainer,
  ViewMap,
  Header,
  BarberShopDetails,
  mapStyle,
} from './styles';
import {
  updateBarbershop,
  selectBarbershopScheduling,
} from '~/store/modules/barbershop/actions';

const barbershopFirebase = firestore().collection('barbershops');
const userFirebase = firestore().collection('users');

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
            user: { ...doc.data() },
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
    const { navigation, logOut } = this.props;
    const {
      detailsVisible,
      barbershopSelected,
      initialCoords,
      nearBarberShops,
    } = this.state;

    return (
      <Container>
        <Header>
          <Button
            onPress={() => {
              logOut();
              navigation.navigate('Login');
            }}
          >
            Sair
          </Button>
        </Header>
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
              <Text>{barbershopSelected.name}</Text>
              <Text>{`Rua: ${barbershopSelected.address.street}, ${barbershopSelected.address.number}`}</Text>
              <Text>{barbershopSelected.description}</Text>
              <Button
                onPress={() => {
                  navigation.navigate('BarbershopResume');
                }}
              >
                Ver Detalhes
              </Button>
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
  logOut: PropTypes.func,
  updateUser: PropTypes.func,
  updateBarbershop: PropTypes.func,
  selectBarbershopScheduling: PropTypes.func,
  auth: PropTypes.any,
};

MainPage.defaultProps = {
  logOut: null,
  auth: null,
  updateUser: null,
  selectBarbershopScheduling: null,
  updateBarbershop: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logOut, updateUser, updateBarbershop, selectBarbershopScheduling },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
