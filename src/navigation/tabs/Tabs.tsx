import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../../styles/Colors';
import Navigation from '../../base/Navigation';
import {screens} from '../screens';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MediaScreen from '../../screens/MediaScreen/MediaScreen';
import {IconSvgTabHome} from '../../assets/Icons/IconSvgTabHome';
import {IconSvgTabMedia} from '../../assets/Icons/IconSvgTabMedia';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import {IconSvgTabProfile} from '../../assets/Icons/IconSvgTabProfile';
import {IconSvgTabSearch} from '../../assets/Icons/IconSvgTabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.black_30,
        tabBarInactiveBackgroundColor: Colors.black_30,
        tabBarShowLabel: false,
      }}
      initialRouteName={Navigation.initialRoute}>
      <Tab.Screen
        name={screens.HOME}
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: Colors.black,
          tabBarLabel: 'Главная',
          tabBarIcon: ({focused}) => (
            <IconSvgTabHome
              color={focused ? Colors.coral : Colors.black_87}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name={screens.MEDIA}
        component={MediaScreen}
        options={{
          tabBarActiveTintColor: Colors.black,
          tabBarLabel: 'Медиа',
          tabBarIcon: ({focused}) => (
            <IconSvgTabMedia
              color={focused ? Colors.coral : Colors.black_87}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.SEARCH}
        component={SearchScreen}
        options={{
          tabBarActiveTintColor: Colors.black,
          tabBarLabel: 'Поиск',
          tabBarIcon: ({focused}) => (
            <IconSvgTabSearch
              color={focused ? Colors.coral : Colors.black_87}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarActiveTintColor: Colors.black,
          tabBarLabel: 'Аккаунт',
          tabBarIcon: ({focused}) => (
            <IconSvgTabProfile
              color={focused ? Colors.coral : Colors.black_87}
              size={25}
            />
          ),
        }}
      />

      {/*<Tab.Screen*/}
      {/*  name={screens.tab.TAB_RATING}*/}
      {/*  component={RatingScreen}*/}
      {/*  options={{*/}
      {/*    tabBarActiveTintColor: Colors.blue,*/}
      {/*    tabBarLabelStyle,*/}
      {/*    tabBarLabel: 'Рейтинг',*/}
      {/*    tabBarIcon: () => <IconSvgTabRating />,*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Tab.Screen*/}
      {/*  name={screens.tab.TAB_PROFILE}*/}
      {/*  component={ProfileScreen}*/}
      {/*  options={{*/}
      {/*    tabBarActiveTintColor: Colors.blue,*/}
      {/*    tabBarLabelStyle,*/}
      {/*    tabBarLabel: 'Профиль',*/}
      {/*    tabBarIcon: () => <IconSvgTabProfile />,*/}
      {/*  }}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
};
