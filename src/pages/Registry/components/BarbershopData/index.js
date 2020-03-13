import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebase } from '@react-native-firebase/storage';
import { Avatar } from 'react-native-elements';
import uuid4 from 'uuid/v4';
import ImagePicker from 'react-native-image-picker';
import Background from '~/components/BarberBackground';
import BeardIcon from '~/assets/images/beard_icon_white.png';
import { updateBarbershop } from '~/store/modules/barbershop/actions';

import {
  Container,
  InputForm,
  SubmitButton,
  AvatarContainer,
  Form,
  Title,
} from './styles';

class BarbershopData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPath: '',
      logoBarbershop: '',
      uploadingLogo: false,
      name: '',
      description: '',
      cnpj: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        zipCode: '',
        regionCode: '',
        complement: '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { barbershop, navigation } = this.props;

    if (prevProps.barbershop.data !== barbershop.data) {
      navigation.navigate('BarbershopServices');
    }
  }

  register = () => {
    const { updateBarbershop } = this.props;

    const { logoBarbershop, name, description, cnpj, address } = this.state;

    const barberShop = {
      logoBarbershop,
      name,
      description,
      cnpj,
      address: {
        ...address,
      },
    };

    updateBarbershop(barberShop);
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
            logoPath: source,
          },
          () => {
            this.uploadImage();
          }
        );
      }
    });
  };

  uploadImage = () => {
    const { logoPath } = this.state;
    // console.tron.log('AVATAAAAR', avatarPath.path);
    const filename = `${uuid4()}`; // Generate unique name
    this.setState({ uploadingLogo: true });

    const storageRef = firebase.storage().ref(`LogoBarbershop/${filename}`);

    storageRef.putFile(logoPath.path).on(
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
        this.setState({ uploadingLogo: false });
      },
      () => {
        storageRef.getDownloadURL().then(downloadURL => {
          console.tron.log('Disponível em:', downloadURL);
          this.setState({ uploadingLogo: false, logoBarbershop: downloadURL });
        });
      }
    );
  };

  render() {
    const {
      name,
      description,
      cnpj,
      address,
      logoPath,
      uploadingLogo,
    } = this.state;
    const { barbershop } = this.props;

    return (
      <Background>
        <Container>
          <Form>
            <Title>Agora, preencha os dados e o endereço da barbearia!</Title>
            <AvatarContainer>
              <Avatar
                icon={{ name: 'person', type: 'material' }}
                source={logoPath !== '' ? logoPath : BeardIcon}
                size="xlarge"
                rounded
                onPress={() => this.chooseFile()}
                activeOpacity={0.7}
                showEditButton
              />
            </AvatarContainer>
            {uploadingLogo && <Title>Aguarde um momento!</Title>}
            <InputForm
              placeholder="Nome da Barbearia"
              value={name}
              onChangeText={value => this.setState({ name: value })}
              autoCorrect={false}
            />
            <InputForm
              placeholder="Descrição"
              value={description}
              onChangeText={value => this.setState({ description: value })}
              autoCorrect={false}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={{ height: 102, alignItems: 'flex-start' }}
            />
            <InputForm
              placeholder="CNPJ"
              value={cnpj}
              mask="[00].[000].[000]/[000]-[00]"
              onChangeText={value => this.setState({ cnpj: value })}
              autoCorrect={false}
            />
            <Title>Endereço</Title>
            <InputForm
              placeholder="CEP"
              keyboardType="numeric"
              value={address.zipCode}
              mask="[00000]-[000]"
              onChangeText={value =>
                this.setState({ address: { ...address, zipCode: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="Rua"
              value={address.street}
              onChangeText={value =>
                this.setState({ address: { ...address, street: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="Número"
              keyboardType="numeric"
              value={address.number}
              onChangeText={value =>
                this.setState({ address: { ...address, number: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="Complemento"
              value={address.complement}
              onChangeText={value =>
                this.setState({ address: { ...address, complement: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="Bairro"
              value={address.neighborhood}
              onChangeText={value =>
                this.setState({ address: { ...address, neighborhood: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="Cidade"
              value={address.city}
              onChangeText={value =>
                this.setState({ address: { ...address, city: value } })
              }
              autoCapitalize="none"
            />
            <InputForm
              placeholder="UF"
              value={address.regionCode}
              onChangeText={value =>
                this.setState({ address: { ...address, regionCode: value } })
              }
              maxLength={2}
              autoCapitalize="none"
            />

            <SubmitButton
              loading={barbershop.loading}
              onPress={() => {
                this.register();
              }}
            >
              Continuar
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}

BarbershopData.propTypes = {
  barbershop: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateBarbershop: PropTypes.func,
};

BarbershopData.defaultProps = {
  updateBarbershop: null,
  barbershop: null,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateBarbershop }, dispatch);

const mapStateToProps = state => ({
  barbershop: state.barbershop,
});

export default connect(mapStateToProps, mapDispatchToProps)(BarbershopData);
