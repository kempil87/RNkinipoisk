import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IFilmCard} from '../../types/FilmTypes';
import {Colors} from '../../styles/Colors';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';

const FilmCardInStaff = (props: IFilmCard) => {
  const goToFilmInStaff = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };

  return (
    <View style={styles.filmCardWrap}>
      <TouchableOpacity onPress={() => goToFilmInStaff(props.filmId)}>
        <Image
          resizeMode={'cover'}
          style={styles.imagePoster}
          source={{
            uri: 'https://play-lh.googleusercontent.com/5czw6iycA8YhjI653GQdwnnmu8NNzEMXV32gZKoVCYZV6PQUAv_YV0uJ2PU1E-Jm9PE',
          }}
        />

        {props?.rating && (
          <Text
            style={+props?.rating > 8.3 ? styles.rating : styles.ratingDown}>
            {props?.rating}
          </Text>
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {props?.nameRu?.length > 22
              ? props?.nameRu?.substring(0, 22) + '...'
              : props?.nameRu}
          </Text>
          <View
            style={{
              paddingHorizontal: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/*<Text style={styles.genreText}>{props?.genres[0]?.genre}</Text>*/}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  filmCardWrap: {
    // marginLeft:16,
    // marginRight: 10,
    marginTop: 6,
  },

  imagePoster: {
    width: Dimensions.get('window').width * 0.43,
    height: 240,
    borderRadius: 10,
    marginTop: 8,
  },
  rating: {
    position: 'absolute',
    paddingVertical: 1,
    paddingHorizontal: 6,
    top: 18,
    left: 6,
    color: Colors.white,
    fontWeight: '700',
    backgroundColor: Colors.turtle_green,
    borderRadius: 2,
  },
  ratingDown: {
    position: 'absolute',
    paddingVertical: 1,
    paddingHorizontal: 6,
    top: 18,
    left: 6,
    color: Colors.white,
    fontWeight: '700',
    backgroundColor: Colors.coral,
    borderRadius: 2,
  },
  nameContainer: {
    width: '100%',
  },
  nameText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
  },
  genreText: {
    color: Colors.black_65,
    fontSize: 14,
  },
});
export default FilmCardInStaff;
