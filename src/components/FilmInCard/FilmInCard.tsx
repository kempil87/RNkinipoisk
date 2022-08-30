import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IFilmInCard} from '../../types/FilmTypes';

const FilmInCard = (props: IFilmInCard) => {
  return (
    <>
      <TouchableOpacity>
        <Image
          resizeMode={'cover'}
          style={styles.imagePoster}
          source={{uri: props.posterUrl}}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{props.nameRu}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  imagePoster: {
    width: '100%',
  },
  name: {
    fontSize: 22,
  },
});
export default FilmInCard;
