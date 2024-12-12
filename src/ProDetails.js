import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import GreenText from './components/atoms/GreenText';
import {productState} from './state/Atom';
import ItemRow from './components/atoms/ItemRow';
import {GREEN, WHITE_BACK} from './utils/Colors';
import {CART_URL, PRODUCT_DETAILS_URL, VIEW_CART} from './utils/Url';
import SubmitButton from './components/atoms/Button';
import {AxiosRequest} from './utils/AxiosRequest';
import {MYCART, PRODUCT_LIST} from './utils/Constant';
import {useRecoilState} from 'recoil';
import Toast from 'react-native-toast-message';
import BlackText from './components/atoms/BlackText';
import FooterButton from './components/atoms/Footer';

const ProductDetailsScreen = () => {
  useEffect(() => {
    getProductDetails();
  }, []);
  const navigation = useNavigation();
  const [productId, setProductId] = useRecoilState(productState);
  const [productData, setProductData] = useState({product_list: []});
  const imageBase = 'https://www.sandslab.com/product_details/';
  const EndPoint = 'uploads/1';

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

  const getProductDetails = async () => {
    console.log(productId + 'productId');
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('product_id', productId);

    let result = await AxiosRequest(apiKey, PRODUCT_DETAILS_URL);
    console.log(JSON.stringify(result) + 'result');
    setProductData(result);
  };
  const onViewCart = async () => {
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('product_id', productId);
    navigation.navigate(MYCART);

    let result = await AxiosRequest(apiKey, VIEW_CART);
    console.log(JSON.stringify(result) + 'result');
    setProductData(result);
  };

  const onAddToCart = async (name, price, id) => {
    let qty = 5;
    let userid = 1;
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('user_id', userid);

    apiKey.append('product_id', id);
    apiKey.append('product_name', name);
    apiKey.append('product_price', price);
    apiKey.append('product_qty', qty);

    let result = await AxiosRequest(apiKey, CART_URL);
    console.log(JSON.stringify(result) + 'result');
    setProductData(result);
    if (result.status == 'success') {
      showSuccess();
    } else {
      showError();
    }
  };

  const Item = ({name, price, qty, image, id}) => (
    <View>
      <BlackText label={Item.name} />
      <BlackText label={Item.price} customStyle={{color: 'red'}} />
      <BlackText label={qty} />
    </View>
  );

  return (
    <View style={styles.root}>
      <GreenText
        label={'Product Details'}
        customStyle={{alignSelf: 'center', marginTop: 50, marginBottom: 0}}
      />
      <Image
        source={{uri: imageBase + productData?.product_list[0]?.product_image}}
        style={styles.imageStyles}
      />
      {console.log(productData?.product_list[0]?.product_image)}
      <ItemRow
        label={'Product ID  : '}
        value={productData?.product_list[0]?.product_id}
      />
      <ItemRow
        label={'Product Name  : '}
        value={productData?.product_list[0]?.product_name}
      />
      <ItemRow
        label={'Product Price : '}
        value={productData?.product_list[0]?.product_price}
      />
      <ItemRow
        label={'Product Details  : '}
        value={productData?.product_list[0]?.product_dis}
      />

      <FooterButton
        label1={' Add to Cart '}
        onButtonPress1={onAddToCart}
        label2={' View Cart '}
        onButtonPress2={onViewCart}
        customStyle={{marginTop: 30}}
      />
      {/* <FooterButton label1={'Add more'}onButtonPress1={navigation.navigate(PRODUCT_LIST)}
      label2={'Buy Now'}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE_BACK,
  },

  imageStyles: {
    height: '40%',
    width: '100%',
    padding: 10,
    marginTop: 50,
  },
});
export default ProductDetailsScreen;
