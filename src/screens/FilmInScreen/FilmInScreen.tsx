import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Navigation from '../../base/Navigation';
import {useRoute} from '@react-navigation/core';
import {api} from '../../base/axios/axios';
import {FilmInfo} from '../../types/FilmTypes';
import {Colors} from '../../styles/Colors';
import {IconSvgBack} from '../../assets/Icons/IconSvgBack';

const FilmInScreen = () => {
  const route: any = useRoute();
  const [filmInfo, setFilmInfo] = useState<FilmInfo | null>(null);
  const [showDes, setShowDes] = useState<boolean>(false);

  const getFilmInfo = () => {
    api.get(`/v2.2/films/${route.params.filmId}`).then(res => {
      console.log(res.data);
      setFilmInfo(res.data);
    });
  };

  useEffect(() => {
    getFilmInfo();
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity style={styles.back} onPress={() => Navigation.pop()}>
        <IconSvgBack />
      </TouchableOpacity>

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
            flexDirection: 'row',
            marginTop: 12,
          }}>
          <Text style={styles.rate}>{filmInfo?.year}</Text>
          {filmInfo && filmInfo?.genres?.length > 0 && (
            <Text style={styles.rate}>
              {filmInfo?.genres?.map(i => i.genre).join(', ')}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
            marginBottom: 15,
          }}>
          {filmInfo && filmInfo?.countries.length > 0 && (
            <Text style={styles.rate}>
              {filmInfo?.countries?.map(i => i.country).join(', ')}
            </Text>
          )}
          <Text style={styles.ageLimit}>
            {filmInfo?.ratingAgeLimits.substr(3)} +
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.des}>
          {showDes ? (
            <Text>
              {filmInfo?.description}
              <TouchableOpacity onPress={() => setShowDes(!showDes)}>
                <Text
                  style={{fontSize: 14, textAlign: 'center', marginLeft: 6}}>
                  Убрать
                </Text>
              </TouchableOpacity>
            </Text>
          ) : (
            <Text>
              {filmInfo?.shortDescription}
              <TouchableOpacity onPress={() => setShowDes(!showDes)}>
                <Text style={{fontSize: 14}}>Показать полностью </Text>
              </TouchableOpacity>
            </Text>
          )}
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  back: {
    marginTop: 15,
    position: 'absolute',
    zIndex: 50,
  },
  imagePoster: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.67,
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
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.white,
    fontWeight: '500',
  },
  rate: {
    fontSize: 14,
    color: Colors.gray300,
    marginRight: 8,
  },
  nameOrig: {
    fontSize: 14,
    color: Colors.white,
  },
  ageLimit: {
    fontSize: 14,
    color: Colors.gray300,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.gray300,
    padding: 4,
    borderRadius: 6,
  },
  des: {
    padding: 15,
    fontSize: 16,
    fontWeight: '800',
    color: Colors.black_54,
  },
});
export default FilmInScreen;
