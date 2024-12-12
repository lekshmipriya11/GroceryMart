import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SubmitButton from './components/atoms/Button';

import ImageField from './components/atoms/ImageFile';
import BrowseButton from './components/atoms/BrowseButton';

import {useNavigation} from '@react-navigation/native';
import {LOGIN} from './utils/Constant';
import { BLACK, WHITE_BACK } from './utils/Colors';

const HomeScreen = () => {
  const navigation = useNavigation();
  const onLogInPress = () => {
    console.log('onLogInPress');
    navigation.navigate(LOGIN);
  };
  return (
    <View style={styles.main}>
      <ImageField customStyle={{marginLeft: 20, height: 300}}/>
      <Text style={styles.mainText}>Welcome to our store</Text>
      <Text  style={styles.textStyle}>Get your groceries in as</Text>
      <Text style={styles.textStyle}>  fast as one hour</Text>
      <SubmitButton label={'Login'} onButtonPress={onLogInPress} customStyle={{marginTop:100}}/>
      <BrowseButton label={'Browse in Grocery Store'} onButtonPress={''} customStyle={{marginTop:30}}/>
    </View>
  );
};
const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:WHITE_BACK,
  },
  mainText:{
    marginTop:30,
    fontSize:30,
    color:BLACK,
    alignSelf:'center',
    fontWeight:'bold',
  },
  textStyle:{
    marginTop:10,
    fontSize:20,
    alignSelf:'center',
    // fontWeight:'bold',
  },
});
export default HomeScreen;
