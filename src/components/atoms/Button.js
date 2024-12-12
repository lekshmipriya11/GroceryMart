import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import WhiteText from './WhiteText';
import {GREEN} from '../../utils/Colors';
import BlackText from './GreenText';
const SubmitButton = ({label, customStyle, onButtonPress}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onButtonPress}
        style={[styles.buttonStyle, customStyle]}>
        <WhiteText label={label} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 0,
    borderColor: GREEN,
    backgroundColor:GREEN,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
  },
});
export default SubmitButton;
