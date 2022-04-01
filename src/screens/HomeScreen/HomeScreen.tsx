import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import {api} from '../../base/axios/axios';
import {Film} from '../../types/FilmTypes';
import FilmCard from '../../components/FilmCard/FilmCard';

const HomeScreen = () => {
  const [topFilms, setTopFilms] = useState<Film[]>([]);

  const getTopFilms = () => {
    api.get('/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1').then(res => {
      setTopFilms(res.data.films);
    });
  };

  const goToFilm = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };

  useEffect(() => {
    getTopFilms();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Navigation.navigate(screens.FILM_IN)}>
        <Text>Перейти к Фильму</Text>
      </TouchableOpacity>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {topFilms?.map(film => (
            <View key={film.filmId}>
              <FilmCard
                filmId={film.filmId}
                nameRu={film.nameRu}
                posterUrl={film.posterUrl}
                rating={film.rating}
                year={film.year}
                genres={film.genres}
                countries={film.countries}
                onPress={(filmId: number) => goToFilm(filmId)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
});

export default HomeScreen;
