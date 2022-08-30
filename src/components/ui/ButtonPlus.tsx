import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../styles/Colors';

export interface IButtonPlus {
  top?: number;
  text?: string;
  onPress: () => void;
}

export const ButtonPlus = ({top, text, onPress}: IButtonPlus) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnContainer, {marginTop: top || 16}]}>
      <Image
        style={styles.btnImg}
        source={require('../../assets/images/btn.png')}
      />
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImg: {
    position: 'absolute',
    width: '100%',
    height: 52,
    borderRadius: 16,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
