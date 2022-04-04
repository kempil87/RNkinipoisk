import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import {api} from '../../base/axios/axios';
import {Film, FilmInfo} from '../../types/FilmTypes';
import FilmCard from '../../components/FilmCard/FilmCard';
import {Colors} from '../../styles/Colors';
import Logo from '../../assets/Logo';

const HomeScreen = () => {
  const [topFilms, setTopFilms] = useState<FilmInfo[]>([]);

  const getTopFilms = () => {
    api.get('/v2.2/films/top?type=TOP_250_BEST_FILMS&page=3').then(res => {
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
      {/*<TouchableOpacity onPress={() => Navigation.navigate(screens.FILM_IN)}>*/}
      {/*  <Text>Перейти к Фильму</Text>*/}
      {/*</TouchableOpacity>*/}
      <Logo />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.titlePage}> Топ 250 фильмов</Text>
        <TouchableOpacity>
          <Text style={styles.titlePageAll}>Все</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {topFilms?.map(film => (
            <View key={film.filmId}>
              <FilmCard
                description={film.description}
                filmId={film.filmId}
                nameRu={film.nameRu}
                posterUrl={film.posterUrl}
                rating={film.rating}
                year={film.year}
                genres={film.genres}
                countries={film.countries}
                onPress={(filmId: number) => goToFilm(filmId)}
                shortDescription={film.shortDescription}
                webUrl={film.webUrl}
                nameOriginal={film.nameOriginal}
                ratingKinopoisk={film.ratingKinopoisk}
                ratingAgeLimits={film.ratingAgeLimits}
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

    height: '100%',
  },
  logo: {
    // width: Dimensions.get('window').width * 0.7,
    width: 180,
    height: 70,
    color: Colors.coral,
  },
  titlePage: {
    marginTop: 8,
    fontSize: 20,
    color: Colors.black,
    fontWeight: '900',
  },
  titlePageAll: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.coral,
    fontWeight: '700',
  },
});

export default HomeScreen;
