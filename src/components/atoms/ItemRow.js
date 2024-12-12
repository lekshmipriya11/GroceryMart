import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { BLACK, GREEN } from '../../utils/Colors';

const ItemRow = ({label, value}) => {
  return (
    <View>
      <Text style={styles.nameStyle}>
        {label}
        <Text style={styles.value}>{value}</Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  nameStyle: {
    marginTop: 30,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 18,
    color: BLACK,
       fontWeight: 'bold',
  },
  value: {
    marginTop: 30,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 18,
    color:GREEN,
  },
});
export default ItemRow;
