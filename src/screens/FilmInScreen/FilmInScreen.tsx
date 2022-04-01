import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Navigation from '../../base/Navigation';
import {useRoute} from '@react-navigation/core';
import {api} from '../../base/axios/axios';
import {FilmInfo} from '../../types/FilmTypes';
import {Colors} from '../../styles/Colors';
import {IconSvgTabBack} from '../../assets/Icons/IconSvgTabBack';

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
  }, [route.params.filmId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Navigation.pop()}>
        <Text>Назад</Text>
      </TouchableOpacity>
      <Text style={styles.des}>
        {showDes ? filmInfo?.description : filmInfo?.shortDescription}
      </Text>
      <TouchableOpacity onPress={() => setShowDes(!showDes)}>
        <Text>Показать полностью</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  des: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black_54,
  },
});
export default FilmInScreen;
