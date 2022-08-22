import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../screens';
import {Tabs} from '../tabs/Tabs';
import FilmInScreen from '../../screens/FilmInScreen/FilmInScreen';
import CreateProfile from '../../screens/CreateProfile/CreateProfile';
import StaffIn from '../../screens/StaffIn/StaffIn';

const Stack = createStackNavigator();

export const TabsStack = (
  <>
    <Stack.Screen name={screens.APP} component={Tabs} />
    <Stack.Screen name={screens.FILM_IN} component={FilmInScreen} />
    <Stack.Screen name={screens.STAFF_IN} component={StaffIn} />
    <Stack.Screen name={screens.CREATE_PROFILE} component={CreateProfile} />
  </>
);
