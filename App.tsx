if (__DEV__) {
  require('./ReactotronConfig');
}
import React from 'react';
import ApplicationNavigator from './src/navigator/BottomTabsNavigator';

const App = () => {
  return <ApplicationNavigator />;
};

export default App;
