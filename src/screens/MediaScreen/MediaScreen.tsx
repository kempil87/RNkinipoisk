import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/Logo';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from '../../styles/Colors';
import {FilmInfo} from '../../types/FilmTypes';
import {api} from '../../base/axios/axios';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import FilmCard from '../../components/FilmCard/FilmCard';
import {IconSvgTabSearch} from '../../assets/Icons/IconSvgTabSearch';

interface ITypeList {
  key: string;
  value: string;
}

const typeList: ITypeList[] = [
  {key: 'RATING', value: 'Рейтингу'},
  {key: 'NUM_VOTE', value: 'Положительным рецензиям'},
  {key: 'YEAR', value: 'Году проката'},
];

const MediaScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('ALL');
  const [items, setItems] = useState([
    {label: 'Фильмы', value: 'FILM'},
    {label: 'TV шоу', value: 'TV_SHOW'},
    {label: 'Сериалы', value: 'TV_SERIES'},
    {label: 'MINI_SERIES', value: 'MINI_SERIES'},
    {label: 'Все', value: 'ALL'},
  ]);
  const [topFilms, setTopFilms] = useState<FilmInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTabs, setActiveTabs] = useState<string>('RATING');
  const [order, setOrder] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const getTopFilms = () => {
    setIsLoading(true);
    api
      .get(`/v2.2/films?order=${order}&page=${page}&type=${value}`)
      .then(res => {
        console.log(res, 'mediaScreen');
        setTopFilms(res.data.items);
        setIsLoading(false);
        // setPage(res.data.pageCount);
      });
  };

  const goToFilm = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };

  const handleClickTabs = (key: string) => {
    setOrder(key);
    setActiveTabs(key);
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };

  const handleClickSearch = () => {
    setIsLoading(true);
    api
      .get(`/v2.2/films?order=${order}&page=${page}&keyword=${items}`)
      .then(res => {
        console.log(res);
        setTopFilms(res.data.items);
        setIsLoading(false);
        // setPage(res.data.pageCount);
      });
  };

  useEffect(() => {
    setOrder('RATING');
  }, []);

  useEffect(() => {
    getTopFilms();
  }, [order, page, value]);

  return (
    <ScrollView style={styles.container}>
      <Logo />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Сортировать по</Text>
        {/*<Text style={styles.titlePageAll}>Все</Text>*/}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder={'Кино , сериалы'}
            value={search}
            onChangeText={handleChangeSearch}
          />
          <TouchableOpacity
            disabled={search === ''}
            style={{marginLeft: 8}}
            onPress={handleClickSearch}>
            <IconSvgTabSearch size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {typeList.map((i, idx) => (
          <TouchableOpacity
            onPress={() => handleClickTabs(i.key)}
            key={idx}
            style={activeTabs === i.key ? styles.ActiveTabs : styles.tabs}>
            <Text
              style={
                activeTabs === i.key ? styles.ActiveTabsText : styles.tabsText
              }>
              {i.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.coral}
        />
      ) : (
        <>
          <View style={styles.filmCardsWrapper}>
            {topFilms?.map(film => (
              <View key={film.filmId}>
                {/*@ts-ignore*/}
                <FilmCard
                  description={film.description}
                  filmId={film.filmId}
                  nameRu={film.nameRu}
                  posterUrl={film.posterUrl}
                  // rating={film.rating}
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
          <View style={styles.pagination}>
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
          </View>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  titlePage: {
    marginTop: 8,
    fontSize: 20,
    color: Colors.black,
    fontWeight: '900',
  },
  tabs: {
    backgroundColor: Colors.black_30,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginVertical: 6,
    marginRight: 6,
    borderRadius: 12,
  },
  tabsText: {
    color: Colors.black,
  },
  ActiveTabs: {
    backgroundColor: Colors.black_87,
    paddingHorizontal: 12,
    paddingVertical: 5,
    color: Colors.white,
    marginVertical: 6,
    marginRight: 6,
    borderRadius: 12,
  },
  ActiveTabsText: {
    color: Colors.white,
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

export default MediaScreen;
