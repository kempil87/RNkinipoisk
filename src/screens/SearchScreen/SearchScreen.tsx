import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconSvgTabSearch} from '../../assets/Icons/IconSvgTabSearch';
import {Colors} from '../../styles/Colors';
import {api} from '../../base/axios/axios';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import {FilmInfo} from '../../types/FilmTypes';
import FilmCard from '../../components/FilmCard/FilmCard';

interface IPerson {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  posterUrl: string;
  sex: string;
}

const SearchScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [searchFilm, setSearchFilm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [staffSearch, setStaffSearch] = useState<IPerson[]>([]);
  const [filmSearch, setFilmSearch] = useState<FilmInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickSearch = () => {
    setIsLoading(true);
    api.get(`/v1/persons?name=${search}&page=${page}`).then(res => {
      setStaffSearch(res.data.items);
      setPage(res.data.total);
      setIsLoading(false);
      // setPage(res.data.pageCount);
    });
  };
  const goToFilm = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };

  const handleClickSearchFilm = () => {
    setIsLoading(true);
    api.get(`/v2.1/films/search-by-keyword?keyword=${searchFilm}`).then(res => {
      console.log(res.data);
      setFilmSearch(res.data.films);
      setIsLoading(false);
    });
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };
  const handleChangeSearchFilm = (e: any) => {
    setSearchFilm(e);
  };

  const goToPerson = (id: number) => {
    Navigation.navigate(screens.STAFF_IN, {id});
  };

  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 24}}>
      <Text>Поиск актеров и режисеров</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.input}
          placeholder={'актеры ,режиссеры'}
          value={search}
          onChangeText={handleChangeSearch}
        />
        <TouchableOpacity style={{marginRight: 2}} onPress={handleClickSearch}>
          <IconSvgTabSearch size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.input}
          placeholder={'Кино , сериалы'}
          value={searchFilm}
          onChangeText={handleChangeSearchFilm}
        />
        <TouchableOpacity
          style={{marginRight: 2}}
          onPress={handleClickSearchFilm}>
          <IconSvgTabSearch size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator
          style={{marginTop: 350}}
          size="large"
          color={Colors.coral}
        />
      ) : (
        <>
          <ScrollView style={styles.personCardsWrapper}>
            <View>
              {staffSearch.map(i => (
                <TouchableOpacity
                  style={{
                    marginLeft: 8,
                    flexDirection: 'row',
                    backgroundColor: Colors.background,
                    borderRadius: 12,
                    marginVertical: 8,
                  }}
                  onPress={() => goToPerson(i.kinopoiskId)}
                  key={i.kinopoiskId}>
                  <Image
                    resizeMode={'cover'}
                    style={styles.image}
                    source={{uri: i?.posterUrl}}
                  />
                  <View style={{marginLeft: 10, marginTop: 12}}>
                    <Text>{i.nameRu}</Text>
                    <Text> {i.sex === 'MALE' ? 'Мужчина' : 'Женщина'}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <ScrollView style={styles.personCardsWrapper}>
            <View>
              {filmSearch?.map(film => (
                <FilmCard
                  description={film?.description}
                  filmId={film?.filmId}
                  nameRu={film?.nameRu}
                  posterUrl={film?.posterUrl}
                  rating={film?.rating}
                  year={film?.year}
                  genres={film?.genres}
                  countries={film?.countries}
                  onPress={(filmId: number) => goToFilm(filmId)}
                  shortDescription={film?.shortDescription}
                  webUrl={film?.webUrl}
                  nameOriginal={film?.nameOriginal}
                  ratingKinopoisk={film?.ratingKinopoisk}
                  ratingAgeLimits={film?.ratingAgeLimits}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 80,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  input: {
    margin: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  personCardsWrapper: {
    marginBottom: 58,
  },
});
export default SearchScreen;
