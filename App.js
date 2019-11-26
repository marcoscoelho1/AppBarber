import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  register = async () => {
    const { email, password } = this.state;

    try {
      console.log('email', email);
      console.log('senha', password);
      const resp = await auth().createUserWithEmailAndPassword(email, password);
      console.log('resp', resp);
    } catch (e) {
      console.error(e.message);
    }
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
