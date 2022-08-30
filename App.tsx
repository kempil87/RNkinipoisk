import React, {useEffect} from 'react';

import {SafeAreaView} from 'react-native';
import Navigator from './src/navigation/Navigator';
import Navigation from './src/base/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const token = async () =>
    await AsyncStorage.getItem('authToken').then(res => {
      console.log(res);
    });

  useEffect(() => {
    token();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={Navigation.navigationRef}>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
