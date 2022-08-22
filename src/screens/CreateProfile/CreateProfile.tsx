import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Navigation from '../../base/Navigation';
import {IconSvgTabBack} from '../../assets/Icons/IconSvgTabBack';
import {Colors} from '../../styles/Colors';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {api} from '../../base/axios/axios';
import GoToBack from '../../UI/GoToBack';

const CreateProfile = () => {
  const [authToken, setAuthToken] = useState('');
  const {control, register, handleSubmit, reset} = useForm();

  const onSubmit = (data: any) => {
    api.post('auth/login', data).then(async res => {
      console.log(res, 7767);
      setAuthToken(res.data.token);
      await AsyncStorage.setItem('authToken', res.data.token);
      console.log(res);
      // console.log(AsyncStorage.getItem('authToken'));
    });
    // reset();
  };

  return (
    <View>
      <GoToBack />
      <View style={styles.container}>
        <View>
          {/*<TextInput*/}
          {/*  placeholder={'Почта'}*/}
          {/*  {...register('email')}*/}
          {/*  style={styles.inputProfile}*/}
          {/*/>*/}
          {/*<TextInput*/}
          {/*  placeholder={'Пароль'}*/}
          {/*  {...register('password')}*/}
          {/*  style={styles.inputProfile}*/}
          {/*/>*/}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.inputProfile}
                onBlur={onBlur}
                placeholder="Почта"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.inputProfile}
                onBlur={onBlur}
                placeholder="Пароль"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  rules={{*/}
          {/*    required: true,*/}
          {/*  }}*/}
          {/*  render={({field: {onChange, onBlur, value}}) => (*/}
          {/*    <TextInput*/}
          {/*      style={styles.inputProfile}*/}
          {/*      onBlur={onBlur}*/}
          {/*      placeholder="Возраст"*/}
          {/*      onChangeText={onChange}*/}
          {/*      value={value}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  name="age"*/}
          {/*/>*/}
          <Button
            color={'#dbdbdb'}
            title={'Войти'}
            onPress={handleSubmit(onSubmit)}
          />
          <Text style={{color: 'white'}}>{authToken && 'Зареган'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: Colors.black,
    height: '100%',
  },
  backWrap: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 50,
  },
  back: {
    paddingVertical: 8,
  },
  inputProfile: {
    borderColor: Colors.black_30,
    backgroundColor: 'rgba(255,255,255,0.93)',
    borderStyle: 'solid',
    textDecorationLine: 'none',
    color: Colors.black,
    paddingLeft: 14,
    marginVertical: 12,
    borderWidth: 2,
  },
});

export default CreateProfile;
