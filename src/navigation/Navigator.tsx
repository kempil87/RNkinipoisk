import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TabsStack} from './stacks/TabsStack';
import {AuthStack} from './stacks/AuthStack';
import {useNetInfo} from '@react-native-community/netinfo';
import {screens} from './screens';
import {useAppSelector} from '../hooks/redux';
import {Alert} from 'react-native';
import Navigation from '../base/Navigation';

export type RootStackParamList = {
  // SCREEN_NAME: {param: IParam};
};

const Stack = createStackNavigator<RootStackParamList>();

// const AppTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: Colors.white,
//   },
// };

const Navigator = () => {
  const netInfo = useNetInfo();
  console.log(netInfo);

  const authToken = useAppSelector(state => state.authReducer.token);

  useEffect(() => {
    if (!netInfo.isConnected) {
      Navigation.navigate(screens.NO_INTERNET);
    } else {
      if (authToken) {
        Navigation.navigate(screens.HOME);
      } else {
        Navigation.navigate(screens.AUTH);
      }
    }
  }, [netInfo.isConnected]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authToken !== '89033415510' ? AuthStack : TabsStack}
    </Stack.Navigator>
  );
};

export default Navigator;
