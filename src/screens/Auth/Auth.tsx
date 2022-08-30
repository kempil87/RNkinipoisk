import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../styles/Colors';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../hooks/redux';

const Auth = () => {
  const {control, register, handleSubmit, reset} = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    await AsyncStorage.setItem('authToken', data.phone);
    dispatch(getToken(data.phone));
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.topText}>Авторизация</Text>
        <Text style={styles.topTextDes}>
          Введите номер телефона в международном формате
        </Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.inputProfile}
                onBlur={onBlur}
                maxLength={11}
                placeholder="+79-99-999-999"
                placeholderTextColor="#003f5c"
                onChangeText={onChange}
                value={value}
                defaultValue={'89033415510'}
              />
            )}
            name="phone"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                secureTextEntry={true}
                style={styles.inputProfile}
                onBlur={onBlur}
                placeholder="Пароль"
                placeholderTextColor="#003f5c"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <TouchableOpacity
            style={styles.authBtn}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.authBtnText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
    height: '100%',
  },
  topTextDes: {
    color: Colors.black,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  topText: {
    color: Colors.black,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  authBtn: {
    paddingVertical: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.light_grey_80,
    borderRadius: 14,
    marginHorizontal: 90,
    marginVertical: 32,
  },
  authBtnText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  inputProfile: {
    borderColor: Colors.light_grey,
    backgroundColor: Colors.light_grey,
    borderStyle: 'solid',
    borderRadius: 12,
    textDecorationLine: 'none',
    color: Colors.black,
    paddingLeft: 14,
    marginVertical: 12,
    borderWidth: 2,
  },
});

export default Auth;
