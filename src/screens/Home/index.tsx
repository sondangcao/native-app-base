import React from 'react';
import {View, Text, Button} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function HomeScreen() {
  // const linkTo = useLinkTo();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={style.view}>
      <Text>Home!</Text>
      <Button
        onPress={() => navigation.navigate('Step1')}
        title="Link to step 1"
      />
    </View>
  );
}
