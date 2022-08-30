import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../screens';
import {Tabs} from '../tabs/Tabs';
import FilmInScreen from '../../screens/FilmInScreen/FilmInScreen';
import Auth from '../../screens/Auth/Auth';
import StaffIn from '../../screens/StaffIn/StaffIn';
import NoInternet from '../../screens/noInternet/NoInternet';

const Stack = createStackNavigator();

export const TabsStack = (
  <>
    <Stack.Screen name={screens.APP} component={Tabs} />
    <Stack.Screen name={screens.FILM_IN} component={FilmInScreen} />
    <Stack.Screen name={screens.STAFF_IN} component={StaffIn} />
    <Stack.Screen name={screens.CREATE_PROFILE} component={Auth} />
    <Stack.Screen name={screens.NO_INTERNET} component={NoInternet} />
  </>
);
