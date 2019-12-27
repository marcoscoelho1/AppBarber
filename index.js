/**
 * @format
 */

import { AppRegistry } from 'react-native';

import './src/config/ReactotronConfig';

import Index from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Index);
