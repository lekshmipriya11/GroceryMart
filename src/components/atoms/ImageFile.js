import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {WHITE_BACK} from '../../utils/Colors';

const ImageField = ({customStyle, imagePath}) => {
  return (
    <View style={styles.main}>
      <Image
        source={require('../../../images/homepic.png')}
        style={[styles.logStyles, customStyle]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  logStyles: {
    height: 400,
    width: 350,
    marginTop: 25,
  },
  main: {
    backgroundColor: WHITE_BACK,
  },
});
export default ImageField;
