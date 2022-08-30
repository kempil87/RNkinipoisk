import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../styles/Colors';
import {IIcon} from '../../base/types/BaseTypes';

export const IconSvgPlus = ({size, color}: IIcon) => {
  return (
    <Svg viewBox="0 0 455 455" width={size || 24} height={size || 24}>
      <Path
        fill={color || Colors.black}
        d="M455 212.5H242.5V0h-30v212.5H0v30h212.5V455h30V242.5H455z"
      />
    </Svg>
  );
};
