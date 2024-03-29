import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IIcon} from '../../../base/types/BaseTypes';

export const IconSvgTabMedia = ({size, color}: IIcon) => {
  return (
    <Svg viewBox="0 0 20 20" width={size} height={size}>
      <Path
        fill={color}
        d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm6 0v12h8V4H6zM2 5v2h2V5H2zm0 4v2h2V9H2zm0 4v2h2v-2H2zm14-8v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zM8 7l5 3-5 3V7z"
      />
    </Svg>
  );
};
