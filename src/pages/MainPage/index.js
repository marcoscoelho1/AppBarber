import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { logOut } from '~/store/modules/auth/actions';
import Button from '~/components/Button';

function MainPage({ logOut, navigation }) {
  return (
    <View>
      <Text>Página Principal</Text>
      <Button
        onPress={() => {
          logOut();
          navigation.navigate('Login');
        }}
      >
        Sair
      </Button>
    </View>
  );
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
