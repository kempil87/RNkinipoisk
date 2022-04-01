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

const FilmCard = (props: IFilmCard) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.filmId)}>
      <Image
        resizeMode={'cover'}
        style={styles.imagePoster}
        source={{uri: props.posterUrl}}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{props.nameRu}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  imagePoster: {
    width: Dimensions.get('window').width * 0.7,
    height: 160,
    marginLeft: 12,
    borderRadius: 14,
  },
  nameContainer: {
    width: '67%',
  },
  nameText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});
export default FilmCard;
