import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BLACK} from '../../utils/Colors';

const BlackText = ({label, customStyle}) => {
  return (
    <View>
      <Text style={[styles.textStyle, customStyle]}>{label}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: BLACK,
    marginLeft: 25,
    marginTop: 10,
  },
});
export default BlackText;
