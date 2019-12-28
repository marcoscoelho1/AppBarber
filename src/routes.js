import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import MainPage from './pages/MainPage';
import EmailAndPassword from './pages/Registry/components/EmailAndPassword';
import UserType from './pages/Registry/components/UserType';
import UserData from './pages/Registry/components/UserData';
import BarbershopData from './pages/Registry/components/BarbershopData';
import BarbershopServices from './pages/Registry/components/BarbershopServices';
import BarbershopResume from './pages/Scheduling/BarbershopResume';

export default loggedIn =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login: createSwitchNavigator({
          Login,
          EmailAndPassword,
          UserType,
          UserData,
          BarbershopData,
          BarbershopServices,
        }),
        App: createStackNavigator({
          MainPage,
          BarbershopResume,
        }),
      },
      {
        initialRouteName: loggedIn ? 'App' : 'Login',
      }
    )
  );
