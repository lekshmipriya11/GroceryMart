import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import { GREEN, TEXT_COLOR } from "../../utils/Colors";

const GreenText = ({label,customStyle}) => {
  return (
    <View>
      <Text style={[styles.textStyle,customStyle]}>
        {label}
        </Text>
    </View>
  );
};
const styles = StyleSheet.create({
    textStyle:{
        fontWeight: 'bold',
        fontSize: 18,
        color:GREEN,
       marginLeft:25,
        marginTop:10,
      },
});
export default GreenText;