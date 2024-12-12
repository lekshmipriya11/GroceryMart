import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import { TEXT_COLOR } from "../../utils/Colors";

const WhiteText = ({label,customStyle}) => {
  return (
    <View>
      <Text style={styles.textStyle}>
        {label}{customStyle}
        </Text>
    </View>
  );
};
const styles = StyleSheet.create({
    textStyle:{
        fontWeight: 'bold',
        fontSize: 18,
        color:TEXT_COLOR,
        alignSelf: 'center',
        marginTop:10,
      },
});
export default WhiteText;