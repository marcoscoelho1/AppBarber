import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logOut } from '~/store/modules/auth/actions';
import Background from '~/components/BarberBackground';
import { Container, ContainerAvatar, List, ItemList, ItemText } from './styles';

function Menu({ user, logOut }) {
  const menuList = [
    {
      index: 1,
      title: 'Histórico Agendamento',
      icon: 'today',
      action: () => {},
    },
    {
      index: 2,
      title: 'Editar Perfil',
      icon: 'person',
      action: () => {},
    },
    {
      index: 3,
      title: 'Alterar Senha',
      icon: 'lock',
      action: () => {},
    },
    {
      index: 4,
      title: 'Sair',
      icon: 'power-settings-new',
      action: () => {
        logOut();
      },
    },
  ];

  return (
    <Background>
      <Container>
        <ContainerAvatar>
          <Avatar
            source={{ uri: user.data.userAvatar }}
            size="xlarge"
            rounded
            activeOpacity={0.7}
          />
        </ContainerAvatar>
        <List
          data={menuList}
          keyExtractor={menu => menu.login}
          renderItem={({ item }) => (
            <ItemList
              key={item.index}
              onPress={() => {
                console.tron.log('Apertou');
                item.action();
              }}
            >
              {item.icon !== '' && (
                <Icon
                  name={item.icon}
                  size={40}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
              )}
              <ItemText>{item.title}</ItemText>
            </ItemList>
          )}
        />
      </Container>
    </Background>
  );
}

Menu.navigationOptions = ({ navigation }) => ({
  title: 'Menu',
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
        navigation.navigate('MainPage');
      }}
    >
      <Icon
        name="chevron-left"
        size={40}
        color="#fff"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  ),
});

Menu.propTypes = {
  user: PropTypes.any,
  logOut: PropTypes.func,
};

Menu.defaultProps = {
  user: null,
  logOut: null,
};

const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);