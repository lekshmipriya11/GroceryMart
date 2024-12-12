import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import InputText from './components/InputText';
import {useRecoilState} from 'recoil';
import AxiosData from './utils/Api';
import {DELETE_CART_URL, VIEW_CART_URL} from './utils/Urls';
import {useNavigation} from '@react-navigation/native';
import {GROCERY_LIST} from './utils/Constants';
import TextName from './components/TextName';

const CartScreen = () => {
  useEffect(() => {
    onViewCart();
  }, []);
  const navigation = useNavigation();
  const [productList, setProductList] = useState('');
  const [productId, setProductId] = useRecoilState(productState);
  const imageBase = 'https://www.sandslab.com/product_details/';
  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'red',
        height: 0.5,
      }}
    />
  );
  const onViewCart = async () => {
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('user_id', '1');
    let response = await AxiosData(apiKey, VIEW_CART_URL);
    console.log(JSON.stringify(response) + 'response');
    setProductList(response);
  };
  const onRemoveProduct = async () => {
    let apiKey = new FormData();

    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('product_id', productId);
    apiKey.append('user_id', '1');

    let response = await AxiosData(apiKey, DELETE_CART_URL);
    console.log(JSON.stringify(response) + 'response');
    if (response.status == 'success') {
      navigation.navigate(GROCERY_LIST);
    } else {
      Alert.alert('Something went wrong');
    }
  };
  const Item = ({name, price, qty, image, id}) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          setProductId(id);
        }}
      />
      {/* <Image source={{uri:imageBase+image}} style={styles.imageStyle}/> */}

      <InputText label={name} customStyles={{color: 'black'}} />
      <InputText label={price} customStyles={{color: 'black'}} />
      <InputText label={qty} customStyles={{color: 'black'}} />
      <Button title="Remove" onPress={onRemoveProduct} />
    </View>
  );
  return (
    <View>
      <InputText label={'View Cart'} customStyles={styles.title} />
      <FlatList
        numColumns={2}
        ItemSeparatorComponent={renderSeparator}
        data={productList.product_list}
        renderItem={({item}) => (
          <Item
            name={item.product_name}
            price={item.price}
            qty={item.qty}
            id={item.product_id}
            // image={item.product_image}
          />
        )}
        keyExtractor={item => item.product_id}
      />

      <InputText label={'Total Amount:'} customStyles={styles.child} />
      <TextName label={'$'} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    justifyContent: 'flex-start',
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  child: {
    fontSize: 14,
  },
});
export default CartScreen;
