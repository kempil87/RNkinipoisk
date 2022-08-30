import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from '../../styles/Colors';
import {IconSvgAddPhoto} from '../../assets/Icons/IconSvgAddPhoto';
import DocumentPicker from 'react-native-document-picker';
import {IconSvgPlus} from '../../assets/Icons/IconSvgPlus';
import {IconSvgGift} from '../../assets/Icons/IconSvgGift';
import {ButtonPlus} from '../../components/ui/ButtonPlus';
import {IconSvgArrowRight} from '../../assets/Icons/IconSvgArrowRight';
import navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../store/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';

const ProfileScreen = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const userNumber = useAppSelector(state => state.authReducer.token);

  const uploadPhoto = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });

    if (res.length > 0 && res[0].uri) {
      setUserPhoto(res[0].uri);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(getToken(''));
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.addPhotoContainer}>
        <TouchableOpacity onPress={uploadPhoto} style={styles.addPhoto}>
          {userPhoto ? (
            <Image style={styles.avatar} source={{uri: userPhoto}} />
          ) : (
            <IconSvgAddPhoto />
          )}
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 16}}>
        <Text style={styles.name}>
          Глеб Макаров - 9507 {'\n'} {userNumber}
        </Text>
      </View>

      <TouchableOpacity style={styles.addProfileContainer}>
        <View style={styles.addProfileTextContainer}>
          <IconSvgPlus color={Colors.black} size={18} />
          <Text style={styles.addProfile}>Добавить детский профиль</Text>
        </View>

        <View>
          <Image
            style={styles.addProfileImage}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
          />
        </View>
      </TouchableOpacity>

      <View style={{marginTop: 32}}>
        <Text style={styles.plus}>Фильмы и сериалы по{'\n'}подписке плюс</Text>
        <Text style={styles.info}>
          А еще музыка и подкасты, кешбэк балами в{'\n'}сервисах Яндекса
        </Text>
      </View>

      <ButtonPlus
        onPress={() => {
          navigation.navigate(screens.CREATE_PROFILE);
        }}
        top={42}
        text={'Оформить'}
      />

      <TouchableOpacity style={[styles.promoCodeContainer, {marginTop: 48}]}>
        <IconSvgGift color={Colors.black} size={18} />
        <Text style={styles.addProfile}>Ввести промокод</Text>
      </TouchableOpacity>

      <View style={{marginTop: 16}}>
        <TouchableOpacity style={styles.cardContainer}>
          <Text>Покупки</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer}>
          <Text>Загрузки</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer}>
          <Text>Персоны</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardContainer, {marginTop: 16}]}>
          <Text>Настройки</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer}>
          <Text>Чат поддержки</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer}>
          <Text>Стать бета-тестировщиком</Text>
          <IconSvgArrowRight color={Colors.gray600} />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 32}}>
        <TouchableOpacity onPress={logout} style={styles.exit}>
          <Text style={styles.exitText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 16,
  },
  addPhotoContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addPhoto: {
    backgroundColor: Colors.gray300,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black,
  },
  addProfileContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addProfileTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addProfile: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  addProfileImage: {
    width: 70,
    height: 70,
  },
  plus: {
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
    color: Colors.black,
  },
  info: {
    marginTop: 8,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.gray600,
  },
  btn: {
    width: '100%',
    height: 52,
  },
  promoCodeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.light_grey,
    borderRadius: 8,
    marginTop: 2,
  },
  exit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitText: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '700',
  },
});

export default ProfileScreen;
