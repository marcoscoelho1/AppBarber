import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import FirstPage from './pages/FirstPage';
import EmailAndPassword from './pages/Registry/components/EmailAndPassword';
import UserType from './pages/Registry/components/UserType';
import UserData from './pages/Registry/components/UserData';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    FirstPage,
    EmailAndPassword,
    UserType,
    UserData,
  })
);
