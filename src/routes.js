import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import MainPage from './pages/MainPage';
import EmailAndPassword from './pages/Registry/components/EmailAndPassword';
import UserType from './pages/Registry/components/UserType';
import UserData from './pages/Registry/components/UserData';
import BarbershopData from './pages/Registry/components/BarbershopData';
import BarbershopServices from './pages/Registry/components/BarbershopServices';

export default createAppContainer(
  createSwitchNavigator({
    BarbershopServices,
    Login,
    MainPage,
    UserData,
    BarbershopData,
    EmailAndPassword,
    UserType,
  })
);
