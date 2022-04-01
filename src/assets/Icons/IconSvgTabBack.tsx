import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconSvgTabBack = () => {
  return (
    <Svg height={24} width={24}>
      <Path fill="black" d="M0 0h24v24H0z" />
      <Path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z" />
    </Svg>
  );
};
