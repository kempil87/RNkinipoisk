import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../styles/Colors';
import {IIcon} from '../../base/types/BaseTypes';

export const IconSvgGift = ({size, color}: IIcon) => {
  return (
    <Svg viewBox="0 0 299.34 299.34" width={size || 24} height={size || 24}>
      <Path
        fill={color || Colors.black}
        d="M282.868 56.803H204.27l6.877-6.158a9.17 9.17 0 0 0 1.35-1.509c10.05-14.091 6.762-33.731-7.331-43.781A28.818 28.818 0 0 0 181.941.743a28.828 28.828 0 0 0-18.837 14.345L149.67 39.887l-13.434-24.799A28.825 28.825 0 0 0 117.399.742a28.819 28.819 0 0 0-23.225 4.612c-14.091 10.05-17.38 29.69-7.331 43.781a9.225 9.225 0 0 0 1.35 1.509l6.877 6.158H16.474a9.18 9.18 0 0 0-9.18 9.18v58.204a9.18 9.18 0 0 0 9.18 9.18h2.432V290.16a9.18 9.18 0 0 0 9.18 9.18h243.17a9.18 9.18 0 0 0 9.18-9.18V133.366h2.432a9.18 9.18 0 0 0 9.18-9.18V65.983a9.18 9.18 0 0 0-9.18-9.18zm-103.62-32.97c1.446-2.671 3.873-4.519 6.833-5.204a10.611 10.611 0 0 1 2.401-.277c2.142 0 4.221.664 6.024 1.95a12.941 12.941 0 0 1 5.285 8.457 12.939 12.939 0 0 1-1.751 8.977l-21.295 19.067h-15.357l17.86-32.97zM99.549 28.76a12.94 12.94 0 0 1 5.286-8.457c2.473-1.764 5.463-2.359 8.425-1.673 2.959.684 5.386 2.533 6.833 5.204l17.86 32.969h-15.357L101.3 37.736a12.937 12.937 0 0 1-1.751-8.976zm15.959 252.221H37.265V133.367h78.243v147.614zm49.964 0h-31.604V133.367h31.604v147.614zm96.604 0h-78.243V133.367h78.243v147.614zm11.612-165.974H25.653V75.163h248.034v39.844z"
      />
    </Svg>
  );
};