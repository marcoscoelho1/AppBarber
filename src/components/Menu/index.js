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

function Menu({ user, logOut, navigation }) {
  const menuList = [
    {
      index: 1,
      title: 'Histórico Agendamento',
      icon: 'today',
      action: () => {
        navigation.navigate('SchedulingHistory');
      },
    },
    {
      index: 2,
      title: 'Editar Perfil',
      icon: 'person',
      action: () => {
        navigation.navigate('UserDataUpdate');
      },
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
                item.action();
              }}
            >
              {item.icon !== '' && (
                <Icon
                  name={item.icon}
                  size={30}
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
        size={30}
        color="#fff"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  ),
});

Menu.propTypes = {
  user: PropTypes.any,
  logOut: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
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
