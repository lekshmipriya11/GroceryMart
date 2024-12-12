import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {GREEN, TEXT_COLOR} from '../../utils/Colors';
import GreenText from './GreenText';

const InputField = ({
  label1,
  label2,
  keyboardType,
  customStyle,
  onChangeText,
  secureTextEntry
}) => {
  return (
    <View style={styles.screen}>
      <GreenText label={label1} customStyle={{marginRight: 30}} />
      <TextInput
        style={styles.inputStyles}
        placeholder={label2}
        customStylestyle={customStyle}
        keyboardType={keyboardType}
        returnKeyType="next"
        onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: TEXT_COLOR,
  },

  inputStyles: {
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 15,
    marginTop: 5,
    borderColor: GREEN,
    borderRadius: 10,
    height: 50,
  },
});
export default InputField;
