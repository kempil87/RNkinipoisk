import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../screens';
import React from 'react';
import Auth from '../../screens/Auth/Auth';
import NoInternet from '../../screens/noInternet/NoInternet';

const Stack = createStackNavigator();

export const AuthStack = (
  <>
    <Stack.Screen name={screens.AUTH} component={Auth} />
    <Stack.Screen name={screens.NO_INTERNET} component={NoInternet} />
  </>
);
