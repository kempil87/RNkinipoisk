import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/core';
import {screens} from '../navigation/screens';

export interface NavigationParams {
  [key: string]: any;
}

class NavigationCl {
  // @ts-ignore
  navigationRef = React.createRef<NavigationContainerRef>();

  initialRoute = screens.HOME;

  navigate = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0,
    );
  };

  replace = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{name: routeName, params: params}],
        }),
      0,
    );
  };

  pop = () => {
    this.navigationRef.current?.goBack();
  };
}

const Navigation = new NavigationCl();
export default Navigation;
