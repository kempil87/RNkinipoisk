import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navigation from '../base/Navigation';
import {IconSvgTabBack} from '../assets/Icons/IconSvgTabBack';
import {Colors} from '../styles/Colors';

interface IProps {
  tittle: string;
}

const GoToBack = (props: IProps) => {
  return (
    <View style={styles.backWrap}>
      <TouchableOpacity style={styles.back} onPress={() => Navigation.pop()}>
        <IconSvgTabBack width={30} height={25} />
      </TouchableOpacity>
      <Text
        style={{
          marginRight: 60,
          fontWeight: '600',
          fontSize: 18,
          color: Colors.black,
        }}>
        {props.tittle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backWrap: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    paddingVertical: 8,
  },
});

export default GoToBack;
