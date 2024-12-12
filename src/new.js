import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextLabel from './components/TextLabel';
import {ADD_CART_URL, GET_PRODUCTS_URL} from './utils/Urls';
import {useRecoilState} from 'recoil';
import { productDetails, productState} from './state/atom';

import InputText from './components/InputText';
import AxiosData from './utils/Api';
import {BACKGROUND_COLOR, SANDS_GREEN} from './utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {ADD_CART_SCREEN, HOMECONTAINER_SCREEN} from './utils/Constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const GroceryListScreen = () => {
  useEffect(() => {
    getProducts();
  }, []);
  const navigation = useNavigation();
  const [productList, setProductList] = useState('');
  const [productId, setProductId] = useRecoilState(productState);
  const [productInfo, setProductInfo] = useRecoilState(productDetail);
    let products = '';
  const imageBase = 'https://www.sandslab.com/product_details/';
  const EndPoint = 'uploads/1';

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'red',
        height: 0.5,
      }}
    />
  );

  const showSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Product',
      text2: 'Added Successfully',
    });
  };
  const showError = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  const onAddCart = async () => {
    let qty = 5;
    let userid = 1;
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('user_id', userid);

    apiKey.append('product_id', productId);
    apiKey.append('product_name', Item.name);
    apiKey.append('product_price', Item.price);
    apiKey.append('product_qty', qty);

    let result = await AxiosData(apiKey, ADD_CART_URL);
    console.log(JSON.stringify(result) + 'result');
    setProductInfo(result);
    if (result == 'success') {
      showSuccess();
    } else {
      showError();
    }
  };
  const Item = ({name, price, id, image}) => (
    // <Text style={styles.textStyle}>hello</Text>
    <View style={styles.itemStyles}>
      <TouchableOpacity
        onPress={() => {
          setProductId(id);
        }}
      />
      <Image source={{uri: imageBase + image}} style={styles.imageStyle} />
      {console.log(imageBase + image)}
      {console.log('name' + price)}

      <InputText label={price} customStyles={{color: 'red'}} />
      <InputText label={name} customStyles={{color: 'black'}} />
      <Button title="Add to cart" color={'green'} onPress={onAddCart} />
    </View>
 );

 const getProducts = async () => {
   let apiKey = new FormData();
   apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
   let response = await AxiosData(apiKey, GET_PRODUCTS_URL);
   console.log(response);
   console.log(JSON.stringify(response + 'response'));
   setProductList(response);
   products = response;
 };

 return (
   <View style={styles.view}>
     <Headers label={'Fruits'}/>
     <FlatList
       numColumns={2}
       ItemSeparatorComponent={renderSeparator}
       data={productList.product_list}
       renderItem={({item}) => (
         <Item
           name={item.product_name}
           price={item.product_price}
           id={item.product_id}
           image={item.product_image}
         />
       )}
       keyExtractor={item => item.product_id}
     />
     
   </View>
 );
};
const styles = StyleSheet.create({
    itemStyles: {
        marginLeft: '5%',
        marginRight: '5%',
    
        marginTop: 15,
        borderWidth: 1,
        padding: 30,
        borderRadius: 5,
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BACKGROUND_COLOR,
      },
      view: {
        flex: 1,
      },
      textStyle: {
        marginTop: 20,
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 18,
        color: SANDS_GREEN,
        fontWeight: 'bold',
      },
      buttonStyles: {
        color: 'green',
      },
      imageStyle: {
        height: 40,
        width: 40,
      },
    });
    export default GroceryListScreen;
