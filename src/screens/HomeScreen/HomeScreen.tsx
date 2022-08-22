import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import {api} from '../../base/axios/axios';
import {FilmInfo} from '../../types/FilmTypes';
import FilmCard from '../../components/FilmCard/FilmCard';
import {Colors} from '../../styles/Colors';
import Logo from '../../assets/Logo';
import {IconSvgTabSearch} from '../../assets/Icons/IconSvgTabSearch';

const HomeScreen = () => {
  const [topFilms, setTopFilms] = useState<FilmInfo[]>([]);
  // const [searchFilms, setSerarchFilms] = useState<FilmInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const getTopFilms = () => {
    setIsLoading(true);
    api.get(`/v2.2/films/top?page=${page}`).then(res => {
      console.log(res);
      setTopFilms(res.data.films);
      setIsLoading(false);
      // setPage(res.data.pageCount);
    });
  };

  const goToFilm = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };

  useEffect(() => {
    getTopFilms();
  }, [page]);

  return (
    <ScrollView style={styles.container}>
      {/*<TouchableOpacity onPress={() => Navigation.navigate(screens.FILM_IN)}>*/}
      {/*  <Text>Перейти к Фильму</Text>*/}
      {/*</TouchableOpacity>*/}
      <Logo />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.titlePage}> Топ 250 фильмов</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/*<Text style={styles.titlePageAll}>Все</Text>*/}
          <TextInput
            style={styles.input}
            placeholder={'... Что ищем?'}
            value={search}
            onChangeText={event => setSearch(event)}
          />
          <IconSvgTabSearch size={24} color={Colors.black} />
        </View>
      </View>
      <View />
      {isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.coral}
        />
      ) : (
        <>
          <View>
            <View style={styles.filmCardsWrapper}>
              {/*{topFilms?.map(film => (*/}
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
            </View>
          </View>
          {/*<View style={{marginTop: 16}}>*/}
          {/*  <Text style={{marginBottom: 16}}>Топ ожидаемых фильмов</Text>*/}
          {/*  <ScrollView*/}
          {/*    horizontal={true}*/}
          {/*    showsHorizontalScrollIndicator={false}>*/}
          {/*    {searchFilms?.map(film => (*/}
          {/*      <View key={film.filmId}>*/}
          {/*        <FilmCardInStaff*/}
          {/*          description={film.description}*/}
          {/*          filmId={film.filmId}*/}
          {/*          nameRu={film.nameRu}*/}
          {/*          posterUrl={film.posterUrl}*/}
          {/*          rating={film.rating}*/}
          {/*          year={film.year}*/}
          {/*          genres={film.genres}*/}
          {/*          countries={film.countries}*/}
          {/*          onPress={(filmId: number) => goToFilm(filmId)}*/}
          {/*          shortDescription={film.shortDescription}*/}
          {/*          webUrl={film.webUrl}*/}
          {/*          nameOriginal={film.nameOriginal}*/}
          {/*          ratingKinopoisk={film.ratingKinopoisk}*/}
          {/*          ratingAgeLimits={film.ratingAgeLimits}*/}
          {/*        />*/}
          {/*      </View>*/}
          {/*    ))}*/}
          {/*  </ScrollView>*/}
          {/*</View>*/}
        </>
      )}
      <View style={styles.pagination}>
        {/*<Text*/}
        {/*  style={page === 1 ? styles.paginationItemHide : styles.paginationItem}*/}
        {/*  onPress={() => setPage(page - 1)}>*/}
        {/*  <IconSvgTabBack width={16} height={16} />*/}
        {/*</Text>*/}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, idx) => (
          <Fragment key={idx}>
            <Text
              style={
                page === idx + 1
                  ? styles.paginationItemActive
                  : styles.paginationItem
              }
              onPress={() => setPage(i)}>
              {i}
            </Text>
          </Fragment>
        ))}
        {/*<Text*/}
        {/*  style={*/}
        {/*    page === 10 ? styles.paginationItemHide : styles.paginationItem*/}
        {/*  }*/}
        {/*  onPress={() => setPage(page + 1)}>*/}
        {/*  <IconSvgTabBack width={16} height={16} />*/}
        {/*</Text>*/}
      </View>
    </ScrollView>
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
  filmCardsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  titlePage: {
    marginTop: 8,
    fontSize: 20,
    color: Colors.black,
    fontWeight: '900',
  },
  loader: {
    marginTop: 8,
    height: 350,
  },
  input: {
    margin: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  titlePageAll: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.coral,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  paginationItem: {
    margin: 3,
    color: Colors.coral,
    width: 25,
    height: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    backgroundColor: '#dbdbdb',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 30,
  },
  paginationItemHide: {
    display: 'none',
  },
  paginationItemActive: {
    margin: 3,
    color: Colors.coral,
    width: 25,
    height: 25,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black_87,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 30,
  },
});

export default HomeScreen;
