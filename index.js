// Fix android crash
// https://github.com/software-mansion/react-native-gesture-handler/issues/320
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
