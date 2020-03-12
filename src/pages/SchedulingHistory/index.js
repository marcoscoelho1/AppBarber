import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { logOut } from '~/store/modules/auth/actions';
import Background from '~/components/BarberBackground';
import { Container, List, ItemList, ItemText } from './styles';

const schedullingFirebase = firestore().collection('schedules');

export class SchedulingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSchedules: [],
    };
  }

  componentDidMount() {
    this.getLastScheduling();
  }

  getLastScheduling = () => {
    const { navigation, user } = this.props;
    schedullingFirebase
      .where('clientId', '==', user.data.uid)
      .limit(10)
      .onSnapshot(querySnapshot => {
        console.tron.log(querySnapshot);
      });

    schedullingFirebase
      .orderBy('date', 'desc')
      .orderBy('time', 'desc')
      .where('clientId', '==', user.data.uid)
      .limit(10)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            const { lastSchedules } = this.state;
            let count = 0;
            this.setState({
              // lastSchedules: [...lastSchedules, doc.data()],
              lastSchedules: [
                ...lastSchedules,
                {
                  index: count++,
                  title: `${
                    doc.data().barbershopName
                  } \n ${format(
                    doc.data().date.toDate(),
                    "dd 'de' MMMM 'de' yyyy",
                    { locale: pt }
                  )} \n às ${doc.data().time}`,
                  icon: 'today',
                  action: () => {
                    navigation.navigate('SchedulingDetails', {
                      details: doc.data(),
                    });
                  },
                  data: doc.data(),
                },
              ],
            });
          });
        }
      });
  };

  render() {
    const { lastSchedules } = this.state;

    return (
      <Background>
        <Container>
          <List
            data={lastSchedules}
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
}

SchedulingHistory.navigationOptions = ({ navigation }) => ({
  title: 'Lista de Agendamentos',
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
        navigation.navigate('Menu');
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

SchedulingHistory.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  user: PropTypes.any,
};

SchedulingHistory.defaultProps = {
  user: null,
};

const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulingHistory);
