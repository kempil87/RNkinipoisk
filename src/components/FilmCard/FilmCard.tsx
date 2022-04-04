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

const FilmCard = (props: IFilmCard) => {
  return (
    <>
      <TouchableOpacity onPress={() => props.onPress(props.filmId)}>
        <Image
          resizeMode={'cover'}
          style={styles.imagePoster}
          source={{uri: props.posterUrl}}
        />
        <Text style={+props.rating > 8.3 ? styles.rating : styles.ratingDown}>
          {props.rating}
        </Text>

        <View style={styles.nameContainer}>
          {props.nameRu.length > 15 ? (
            <Text style={styles.nameText}>{props.nameRu.substr(0, 13)}...</Text>
          ) : (
            <Text style={styles.nameText}>{props.nameRu}</Text>
          )}
          <Text style={styles.genreText}>{props.genres[0].genre}</Text>
        </View>
      </TouchableOpacity>

      {/*{genres.map(i => (*/}
      {/*  <Text>{i.genre}</Text>*/}
      {/*))}*/}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  imagePoster: {
    width: Dimensions.get('window').width * 0.33,
    height: 200,
    marginLeft: 2,
    marginRight: 9,
    borderRadius: 10,
    marginTop: 8,
  },
  rating: {
    position: 'absolute',
    paddingVertical: 1,
    paddingHorizontal: 6,
    top: 18,
    left: 0,
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
    left: 0,
    color: Colors.white,
    fontWeight: '700',
    backgroundColor: Colors.coral,
    borderRadius: 2,
  },
  nameContainer: {
    width: '100%',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  genreText: {
    color: Colors.black_65,
    fontSize: 14,
  },
});
export default FilmCard;
