import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/storage';
import uuid4 from 'uuid/v4';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { updateUserFirebase } from '~/store/modules/user/actions';

import {
  AvatarContainer,
  Container,
  InputForm,
  SubmitButton,
  Form,
  Title,
} from './styles';

class UserDataUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: '',
      name: '',
      cpf: '',
      birthDate: '',
      cellphone: '',
      userAvatar: '',
      uploadingAvatar: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      name: user.data.name,
      cpf: user.data.cpf,
      birthDate: user.data.birthDate,
      cellphone: user.data.cellphone,
      userAvatar: user.data.userAvatar,
    });
  }

  updateUser = () => {
    const { updateUserFirebase } = this.props;

    const { name, cpf, birthDate, cellphone, userAvatar } = this.state;

    const user = {
      name,
      cpf,
      birthDate,
      cellphone,
      userAvatar,
    };

    updateUserFirebase(user);
  };

  chooseFile = () => {
    const options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.tron.log('Response = ', response);

      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.tron.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        const source = response;
        this.setState(
          {
            avatarPath: source,
          },
          () => {
            this.uploadImage();
          }
        );
      }
    });
  };

  uploadImage = () => {
    const { avatarPath } = this.state;
    // console.tron.log('AVATAAAAR', avatarPath.path);
    const filename = `${uuid4()}`; // Generate unique name
    this.setState({ uploadingAvatar: true });

    const storageRef = firebase.storage().ref(`UserAvatar/${filename}`);

    storageRef.putFile(avatarPath.path).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        /* let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
          }; */
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.tron.log('deuuuuu ceeeertoooo', snapshot.downloadURL);
        }
      },
      error => {
        console.tron.log('erroooor', error);
        this.setState({ uploadingAvatar: false });
      },
      () => {
        storageRef.getDownloadURL().then(downloadURL => {
          console.tron.log('Disponível em:', downloadURL);
          this.setState({ uploadingAvatar: false, userAvatar: downloadURL });
        });
      }
    );
  };

  render() {
    const {
      avatarPath,
      name,
      cpf,
      birthDate,
      cellphone,
      uploadingAvatar,
      userAvatar,
    } = this.state;
    const { user } = this.props;

    return (
      <Background>
        <Container>
          <Form>
            <AvatarContainer>
              <Avatar
                icon={{ name: 'person', type: 'material' }}
                source={
                  avatarPath !== ''
                    ? avatarPath
                    : userAvatar !== ''
                    ? { uri: user.data.userAvatar }
                    : BeardIcon
                }
                size="xlarge"
                rounded
                onPress={() => this.chooseFile()}
                activeOpacity={0.7}
                showEditButton
              />
            </AvatarContainer>
            {uploadingAvatar && <Title>Aguarde um momento!</Title>}
            <InputForm
              placeholder="Nome Completo"
              value={name}
              onChangeText={value => this.setState({ name: value })}
              autoCorrect={false}
            />
            <InputForm
              placeholder="CPF"
              keyboardType="numeric"
              value={cpf}
              onChangeText={value => {
                this.setState({ cpf: value });
              }}
              autoCapitalize="none"
              mask="[000].[000].[000]-[00]"
            />
            <InputForm
              placeholder="Data de Nascimento"
              keyboardType="numeric"
              value={birthDate}
              onChangeText={value => this.setState({ birthDate: value })}
              autoCapitalize="none"
              mask="[00]/[00]/[0000]"
            />
            <InputForm
              placeholder="Celular"
              keyboardType="numeric"
              value={cellphone}
              onChangeText={value => this.setState({ cellphone: value })}
              autoCapitalize="none"
              mask="([00])[00000]-[0000]"
            />
            <SubmitButton
              loading={user.loading}
              onPress={() => {
                this.updateUser();
              }}
            >
              Salvar
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}

UserDataUpdate.navigationOptions = () => ({
  title: 'Editar Perfil',
  headerStyle: {
    backgroundColor: '#3E2622',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

UserDataUpdate.propTypes = {
  user: PropTypes.any.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateUserFirebase: PropTypes.func,
};

UserDataUpdate.defaultProps = {
  updateUserFirebase: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUserFirebase }, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataUpdate);
