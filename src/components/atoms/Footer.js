import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SubmitButton from './Button';

const FooterButton = ({onButtonPress1,onButtonPress2,label1,label2,customStyle}) => {
  return (
    <View style={styles.buttonView}>
      <Text style={[styles.homeText,customStyle]}>
        <SubmitButton
          label={label1}
          onButtonPress={onButtonPress1}
        />
        <SubmitButton
          label={label2}
          onButtonPress={onButtonPress2}
          style={styles.style2}
        />
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
  },
  homeText: {
    marginTop: 20,
    marginLeft:50,
    marginRight:10,
  },

  style: {
    // width: 200,
  },
  style2: {
    // alignSelf:'flex-end',
    width:200,
  },
});
export default FooterButton;
