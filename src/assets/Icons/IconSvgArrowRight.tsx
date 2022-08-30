import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../styles/Colors';
import {IIcon} from '../../base/types/BaseTypes';

export const IconSvgArrowRight = ({size, color}: IIcon) => {
  return (
    <Svg width={size || 24} height={size || 24}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L14.94 12 9.47 6.53a.75.75 0 0 1 0-1.06Z"
        fill={color || Colors.black}
      />
    </Svg>
  );
};
