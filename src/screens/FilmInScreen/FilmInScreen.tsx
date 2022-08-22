import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Navigation from '../../base/Navigation';
import {useRoute} from '@react-navigation/core';
import {api} from '../../base/axios/axios';
import {
  FilmInfo,
  IFilmAwards,
  IFilmFacts,
  IFilmStaff,
  IFilmStill,
} from '../../types/FilmTypes';
import {Colors} from '../../styles/Colors';
import Dialog from '../../components/Modal';
import FilmAwardsCard from '../../components/filmAwardsCard/FilmAwardCard';
import DialogShowMoreFacts from '../../components/DialogShowMoreFacts';
import FilmCard from '../../components/FilmCard/FilmCard';
import {screens} from '../../navigation/screens';
import GoToBack from '../../UI/GoToBack';

const FilmInScreen = () => {
  const route: any = useRoute();
  const [filmInfo, setFilmInfo] = useState<FilmInfo | null>(null);
  const [filmSimilars, setFilmSimilars] = useState<FilmInfo[] | null>([]);
  const [filmAwards, setFilmAwards] = useState<IFilmAwards[]>([]);
  const [filmSequels, setFilmSequels] = useState<FilmInfo[]>([]);
  const [filmStill, setFilmStill] = useState<IFilmStill[]>([]);
  const [filmFacts, setFilmFacts] = useState<IFilmFacts[]>([]);
  const [filmStaffs, setFilmStaffs] = useState<IFilmStaff[]>([]);
  const [totalStill, setTotalStill] = useState<number | null>(null);
  const [totalAwards, setTotalAwards] = useState<number | null>(null);
  const [totalSimilars, setTotalSimilars] = useState<number | null>(null);
  const [showDes, setShowDes] = useState<boolean>(false);
  const [isload, setIsload] = useState<boolean>(false);

  const getFilmInfo = () => {
    setIsload(true);
    api.get(`/v2.2/films/${route.params.filmId}`).then(res => {
      console.log(res.data);
      setFilmInfo(res.data);
      setIsload(false);
    });
  };

  const getFilmAwards = () => {
    api.get(`/v2.2/films/${route.params.filmId}/awards`).then(res => {
      console.log(res.data, 'sequels');
      setFilmAwards(res.data.items);
      setTotalAwards(res.data.total);
    });
  };

  const getFilmStill = () => {
    api.get(`/v2.2/films/${route.params.filmId}/images`).then(res => {
      console.log(res.data, 'still');
      setFilmStill(res.data.items);
      setTotalStill(res.data.total);
    });
  };

  const getFilmFacts = () => {
    api.get(`/v2.2/films/${route.params.filmId}/facts`).then(res => {
      console.log(res.data, 'facts');
      setFilmFacts(res.data.items);
    });
  };

  const getFilmSequels = () => {
    api
      .get(`/v2.1/films/${route.params.filmId}/sequels_and_prequels`)
      .then(res => {
        console.log(res.data, 'prequels');
        setFilmSequels(res.data);
      });
  };
  const getFilmSimilars = () => {
    api.get(`/v2.2/films/${route.params.filmId}/similars`).then(res => {
      console.log(res.data, 'similars');
      setFilmSimilars(res.data.items);
      setTotalSimilars(res.data.total);
    });
  };
  const getFilmStaffs = () => {
    api.get(`/v1/staff?filmId=${route.params.filmId}`).then(res => {
      console.log(res.data, 'stafff');
      setFilmStaffs(res.data.slice(0, 12));
      // setTotalStaffs(res.data.total);
    });
  };

  const goToFilm = (filmId: number) => {
    Navigation.navigate(screens.FILM_IN, {filmId});
  };
  const goToStaff = (staffId: number) => {
    Navigation.navigate(screens.STAFF_IN, {staffId});
  };
  const checkFacts = (text: string) => {
    const newList = filmFacts.map(i =>
      i.text === text ? {...i, spoiler: false} : i,
    );
    setFilmFacts(newList);
    console.log(filmFacts, 'fFacts');
  };

  useEffect(() => {
    getFilmInfo();
    getFilmStill();
    getFilmAwards();
    getFilmFacts();
    getFilmSequels();
    getFilmSimilars();
    getFilmStaffs();
  }, []);

  if (isload) {
    return (
      <ActivityIndicator
        style={{marginTop: 350}}
        size="large"
        color={Colors.coral}
      />
    );
  }
  return (
    <ScrollView>
      <GoToBack />

      <Image
        resizeMode={'stretch'}
        style={styles.imagePoster}
        source={{uri: filmInfo?.posterUrl}}
      />

      <View
        style={{
          backgroundColor: Colors.black_87,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.nameRu}>{filmInfo?.nameRu}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          <Text style={styles.rate}>{filmInfo?.ratingKinopoisk}</Text>
          <Text style={styles.nameOrig}>{filmInfo?.nameOriginal}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 12,
          }}>
          {filmInfo && filmInfo?.genres?.length > 0 && (
            <Text style={styles.genres}>
              {filmInfo?.genres?.map(i => i.genre).join(', ')}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginBottom: 15,
          }}>
          {filmInfo && filmInfo?.countries.length > 0 && (
            <Text style={styles.nameRu}>
              {filmInfo?.countries?.map(i => i.country).join(', ')}
            </Text>
          )}
          <Text style={styles.rateAge}>
            {filmInfo?.ratingAgeLimits.substr(3)} +
          </Text>
          <Text style={styles.nameRu}>{filmInfo?.year}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.des}>
          {showDes ? filmInfo?.description : filmInfo?.shortDescription}
        </Text>
        <TouchableOpacity onPress={() => setShowDes(!showDes)}>
          <Text style={styles.desBtn}>
            {showDes ? 'Убрать' : 'Показать полностью'}
          </Text>
        </TouchableOpacity>
      </View>

      {/*@ts-ignore*/}
      <Dialog description={filmInfo?.description} />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Награды и премии</Text>
        <Text style={styles.awardsTotal}>{totalAwards}</Text>
      </View>
      <ScrollView
        style={{marginVertical: 24}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmAwards?.map((awards, idx) => (
          <FilmAwardsCard
            key={idx}
            name={awards?.name}
            persons={awards?.persons}
            imageUrl={awards?.imageUrl}
            nominationName={awards?.nominationName}
            year={awards?.year}
          />
        ))}
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Актеры и съемочная группа</Text>
      </View>
      <ScrollView
        style={{marginVertical: 12, marginHorizontal: 16}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmStaffs?.map(staff => (
          <TouchableOpacity onPress={() => goToStaff(staff.staffId)}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginRight: 8,
              }}
              key={staff?.staffId}>
              <Image
                resizeMode={'cover'}
                style={styles.imageUrlStaff}
                source={{uri: staff?.posterUrl}}
              />
              <View style={{marginLeft: 8}}>
                <Text style={{fontWeight: '700', color: Colors.black}}>
                  {staff?.nameRu}
                </Text>
                <Text style={{marginTop: 4, fontWeight: '600'}}>
                  {staff?.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Кадры и изображения</Text>
        <Text style={styles.awardsTotal}>{totalStill}</Text>
      </View>
      <ScrollView
        style={{marginVertical: 24}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmStill?.map((still, idx) => (
          <Image
            resizeMode={'cover'}
            style={styles.imageUrlStill}
            key={idx}
            source={{uri: still.imageUrl}}
          />
        ))}
        <TouchableOpacity style={styles.imageUrlStillBtnAll}>
          <Text style={styles.imageUrlStillBtnAllText}>Смотреть все</Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Знаете ли вы что ...</Text>
        <Text style={styles.awardsTotal}>{totalStill}</Text>
      </View>
      <ScrollView
        style={{marginVertical: 24}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmFacts?.map((facts, idx) => (
          <View style={styles.factsWrap} key={idx}>
            {!facts?.spoiler ? (
              <>
                {facts?.type === 'FACT' ? (
                  <Text>Факты</Text>
                ) : (
                  <Text>Ошибки</Text>
                )}
                {facts?.text?.length > 80 ? (
                  <View style={{}}>
                    <Text style={{maxWidth: 200}}>
                      {facts?.text.substring(0, 80)}
                    </Text>
                    <DialogShowMoreFacts
                      text={facts.text}
                      spoiler
                      type={facts.type}
                    />
                  </View>
                ) : (
                  <Text style={{maxWidth: 200}}>{facts?.text}</Text>
                )}
                <Text> Споилеры : {!facts?.spoiler ? 'Нет' : 'Есть'}</Text>
              </>
            ) : (
              <TouchableOpacity onPress={() => checkFacts(facts?.text)}>
                <Text>Осторожно спойлер</Text>
                <Text>Смотерть факт</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.imageUrlStillBtnAll}>
          <Text style={styles.imageUrlStillBtnAllText}>Смотреть все</Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Сиквелы и приквелы</Text>
        <Text style={styles.awardsTotal}>{filmSequels.length}</Text>
      </View>
      <ScrollView
        style={{marginVertical: 24, marginHorizontal: 6}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmSequels?.map(film => (
          <View style={{marginHorizontal: 4}} key={film.filmId}>
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
          </View>
        ))}
        {/*<TouchableOpacity style={styles.imageUrlStillBtnAll}>*/}
        {/*  <Text style={styles.imageUrlStillBtnAllText}>Смотреть все</Text>*/}
        {/*</TouchableOpacity>*/}
      </ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.awardsTitle}>Похожие фильмы</Text>
        <Text style={styles.awardsTotal}>{totalSimilars}</Text>
      </View>
      <ScrollView
        style={{marginVertical: 24, marginHorizontal: 6}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filmSimilars?.map(film => (
          <View style={{marginHorizontal: 4}} key={film.filmId}>
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
          </View>
        ))}
        <TouchableOpacity style={styles.imageUrlStillBtnAllSimilars}>
          <Text style={styles.imageUrlStillBtnAllTextSimilars}>
            Смотреть все
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  factsWrap: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 8,
    marginTop: 12,
    height: 180,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  backWrap: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 50,
  },
  back: {
    paddingVertical: 8,
  },
  imagePoster: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.73,
  },
  imageUrlStill: {
    width: 330,
    height: 160,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageUrlStaff: {
    width: 40,
    height: 50,
    borderRadius: 8,
    // marginTop: 10,
    // marginBottom: 20,
    // marginHorizontal: 10,
  },
  imageUrlStillBtnAll: {
    width: 100,
    backgroundColor: Colors.coral,
    justifyContent: 'center',
    height: 180,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageUrlStillBtnAllText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 6,
  },
  imageUrlStillBtnAllSimilars: {
    width: 130,
    backgroundColor: Colors.coral,
    justifyContent: 'center',
    height: 260,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageUrlStillBtnAllTextSimilars: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 6,
  },
  backgroundPoster: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.black,
  },
  nameRu: {
    marginTop: 8,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
    fontWeight: '500',
  },
  genres: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
  awardsTitle: {
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black_87,
  },
  awardsTotal: {
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.coral,
  },
  rate: {
    fontSize: 14,
    backgroundColor: Colors.coral,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    color: Colors.black_65,
    marginRight: 8,
  },
  rateAge: {
    fontSize: 14,
    backgroundColor: Colors.blue,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    height: 25,
    color: Colors.black_54,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  nameOrig: {
    fontSize: 14,
    color: Colors.white,
  },
  des: {
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  desBtn: {
    paddingHorizontal: 15,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '400',
    color: Colors.gray300,
  },
});
export default FilmInScreen;
