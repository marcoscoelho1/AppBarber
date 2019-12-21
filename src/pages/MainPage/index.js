import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import MapView from 'react-native-maps';
import { Text } from 'react-native';
import { logOut } from '~/store/modules/auth/actions';
import Button from '~/components/Button';

import {
  Container,
  MapContainer,
  ViewMap,
  Header,
  BarberShopDetails,
  mapStyle,
} from './styles';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsVisible: false,
      barbershopSelected: {
        name: '',
        address: '',
        description: '',
      },
    };
  }

  setBabershopSelected = babershop => {
    this.setState({
      barbershopSelected: { ...babershop },
    });
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
    const { detailsVisible, barbershopSelected } = this.state;

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
            region={{
              latitude: -23.1910636,
              longitude: -47.3139639,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onPress={() => {
              this.handleCloseDetailsVisible();
            }}
          >
            <ViewMap.Marker
              coordinate={{ latitude: -23.1929053, longitude: -47.3124952 }}
              // title="title"
              // description="description"
              onPress={() => {
                this.setBabershopSelected({
                  name: 'Barbearia 1',
                  address: 'Rua Europa',
                  description: 'Barbearia Top',
                });
              }}
            />
            <ViewMap.Marker
              coordinate={{ latitude: -23.1910685, longitude: -47.3117752 }}
              onPress={() => {
                this.setBabershopSelected({
                  name: 'Barbearia 2',
                  address: 'Rua Europa',
                  description: 'Barbearia Top',
                });
              }}
            />
          </ViewMap>
          {detailsVisible && (
            <BarberShopDetails>
              <Text>{barbershopSelected.name}</Text>
              <Text>{barbershopSelected.address}</Text>
              <Text>{barbershopSelected.description}</Text>
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
};

MainPage.defaultProps = {
  logOut: null,
};

const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

export default connect(null, mapDispatchToProps)(MainPage);
