import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { registerFirebase } from '~/store/modules/auth/actions';
// import auth from '@react-native-firebase/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  register = () => {
    const { email, password } = this.state;
    const { registerFirebase } = this.props;
    registerFirebase(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <View>
        <Text>App Barber</Text>
        <Input
          icon="email"
          placeholder="E-mail"
          value={email}
          onChangeText={value => this.setState({ email: value })}
        />
        <Input
          icon="lock"
          placeholder="Senha"
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
        <Button
          onPress={() => {
            this.register();
          }}
        >
          Criar Usuário
        </Button>
        <TouchableOpacity
          onPress={() => {
            this.register();
          }}
        >
          <Text>Criar Usuário</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

App.propTypes = {
  registerFirebase: PropTypes.func,
};

App.defaultProps = {
  registerFirebase: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ registerFirebase }, dispatch);

export default connect(null, mapDispatchToProps)(App);
