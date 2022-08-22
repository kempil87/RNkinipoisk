import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {Colors} from '../../styles/Colors';
import Navigation from '../../base/Navigation';
import {screens} from '../../navigation/screens';

const ProfileScreen = () => {
  const goToCreate = () => {
    Navigation.navigate(screens.CREATE_PROFILE);
  };

  return (
    <View>
      <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>
        У вас нет аккаунта
      </Text>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          resizeMode={'cover'}
          style={{width: 80, height: 90}}
        />
      </View>

      <View style={{marginTop: 16}}>
        <Button
          onPress={goToCreate}
          color={Colors.black_65}
          title={'Создать аккаунт'}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
