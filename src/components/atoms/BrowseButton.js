import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { GREEN } from '../../utils/Colors';
import GreenText from './GreenText';
const BrowseButton = ({label, customStyle,onButtonPress}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.buttonStyle, customStyle]}
       activeOpacity={1}
       onPress={onButtonPress}>
        <GreenText label={label}customStyle={{ alignSelf:'center'}}/>
      </TouchableOpacity>
    </View>
  );
};
const styles=StyleSheet.create({
    buttonStyle: {
        marginTop: 20,
        borderColor:GREEN,
        borderRadius:10,
        borderWidth:2,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
       
      },
})
export default BrowseButton;
