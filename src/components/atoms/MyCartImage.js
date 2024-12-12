import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const CartImage = label => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(label);
        }}>
        <Image
          source={require('../../../images/cart.png')}
          style={styles.imageStyles}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  imageStyles: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginLeft: 200,
  },
});
export default CartImage;
