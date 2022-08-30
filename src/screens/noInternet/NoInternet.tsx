import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/nointernet.png')}
      />
      <Text>Отсутствует подключение к интернету</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 140,
    width: 150,
    marginVertical: 32,
  },
});

export default NoInternet;
