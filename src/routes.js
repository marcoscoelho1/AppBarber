import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import FirstPage from './pages/FirstPage';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    FirstPage,
    SignUp,
  })
);
