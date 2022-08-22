import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IFilmAwards} from '../../types/FilmTypes';
import {Colors} from '../../styles/Colors';

const FilmAwardsCard = (props: IFilmAwards) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode={'stretch'}
        style={styles.imageUrl}
        source={{uri: props?.imageUrl}}
      />
      <Text style={styles.nameAwards}>{props.name}</Text>
      <Text style={styles.nominationName}>{props.nominationName}</Text>
      {/*<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>*/}
      {/*  {props.persons.map(item => (*/}
      {/*    <>*/}
      {/*      <Image*/}
      {/*        resizeMode={'stretch'}*/}
      {/*        style={styles.imageUrl}*/}
      {/*        source={{uri: item.posterUrl}}*/}
      {/*      />*/}
      {/*      <Text>{item.nameRu}</Text>*/}
      {/*    </>*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
      <Text>{props.year}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  imageUrl: {
    marginVertical: 16,
    width: 60,
    height: 90,
  },
  nameAwards: {
    textAlign: 'center',
    marginVertical: 4,
    fontWeight: '600',
    color: Colors.yellow,
  },
  nominationName: {
    width: 150,
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '600',
  },
});

export default FilmAwardsCard;
