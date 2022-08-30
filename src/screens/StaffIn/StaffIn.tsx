import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/core';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {api} from '../../base/axios/axios';
import GoToBack from '../../UI/GoToBack';
import {Colors} from '../../styles/Colors';
import {IStaffInfo} from '../../types/FilmTypes';
import FilmCardInStaff from '../../components/FilmCardInStaff/FilmCardInStaff';

const StaffIn = () => {
  const [staffInfo, setStaffInfo] = useState<IStaffInfo | null>(null);
  const [idLoad, setIsload] = useState<boolean>(false);
  const route: any = useRoute();
  const getStaffInfo = () => {
    setIsload(true);
    api.get(`/v1/staff/${route.params.staffId}`).then(res => {
      console.log(res.data);
      setStaffInfo(res.data);
      setIsload(false);
    });
  };

  const sortStaffInfo = staffInfo?.films.sort((a, b) => {
    return Number(b.rating) - Number(a.rating);
  });

  useEffect(() => {
    getStaffInfo();
  }, []);

  return (
    <View style={styles.container}>
      {/*@ts-ignore*/}
      <GoToBack tittle={staffInfo?.nameRu} />
      {idLoad ? (
        <ActivityIndicator
          style={{marginTop: 350}}
          size="large"
          color={Colors.coral}
        />
      ) : (
        <ScrollView style={{marginTop: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode={'cover'}
              style={styles.posterStaff}
              source={{uri: staffInfo?.posterUrl}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: Colors.black,
                  marginBottom: 8,
                }}>
                {staffInfo?.nameRu}
              </Text>
              <Text
                style={{fontSize: 15, color: Colors.black, marginBottom: 8}}>
                {staffInfo?.nameEn}
              </Text>
              <Text style={{fontSize: 13, color: Colors.warm_grey}}>
                {staffInfo?.profession}
              </Text>
              <Text style={{fontSize: 13, color: Colors.warm_grey}}>
                {staffInfo?.birthday}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, color: Colors.warm_grey}}>
                  {staffInfo?.age} года
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.warm_grey,
                    marginLeft: 12,
                  }}>
                  {staffInfo?.growth} см
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>Лучшие фильмы и сериалы</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {sortStaffInfo?.map(i => (
              <View key={i.filmId} style={{marginRight: 8}}>
                <FilmCardInStaff
                  description={i.description}
                  nameOriginal={i.nameEn}
                  filmId={i.filmId}
                  nameRu={i.nameRu}
                  rating={i.rating}
                />
              </View>
            ))}
          </ScrollView>
          <Text style={styles.title}>Факты</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {staffInfo?.facts.map((i, idx) => (
              <View key={idx} style={styles.factsWrap}>
                <Text>{i}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  posterStaff: {
    width: 130,
    height: 190,
    borderRadius: 16,
  },
  title: {
    paddingTop: 22,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black_87,
  },
  factsWrap: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 12,
    height: 130,
    marginRight: 12,
    width: 180,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
});

export default StaffIn;
