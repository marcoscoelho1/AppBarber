import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { registerFirebase } from '../../store/modules/auth/actions';
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
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => this.setState({ email: value })}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ registerFirebase }, dispatch);

export default connect(null, mapDispatchToProps)(App);
