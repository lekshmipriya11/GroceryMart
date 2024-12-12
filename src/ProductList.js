import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {CART_URL, PRODUCT_LIST_URL, VIEW_CART} from './utils/Url.js';
import {BLACK, WHITE_BACK} from './utils/Colors';
import {productDetails, productState} from './state/Atom';
import {AxiosRequest} from './utils/AxiosRequest';
import {DETAILS, MYCART} from './utils/Constant.js';
import GreenText from './components/atoms/GreenText.js';
import {Toast} from 'react-native-toast-message/lib/src/Toast.js';
import SubmitButton from './components/atoms/Button.js';

const ProductsListScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getProductList();
  }, []);
  const [productList, setProductList] = useState('');
  const [productId, setProductId] = useRecoilState(productState);
  const [productData, setProductData] = useRecoilState(productDetails);
  let products = '';
  const imageBase = 'https://www.sandslab.com/product_details/';
  const EndPoint = 'uploads/1';

  const renderSpace = () => (
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

  const Item = ({name, price, id, image}) => (
    <View style={styles.itemStyle}>
      <TouchableOpacity
        onPress={() => {
          setProductId(id);
          navigation.navigate(DETAILS);
        }}>
        <Image source={{uri: imageBase + image}} style={styles.imageStyle} />
        {console.log(imageBase + image)}
        {console.log('name' + price)}
        <GreenText label={name} customStyle={{color: BLACK}} />
        <GreenText label={price} customStyle={{color: 'red'}} />
        <SubmitButton
          label={' + CART '}
          onButtonPress={() => onAddToCart(name, price, id)}
        />
      </TouchableOpacity>
    </View>
  );

  const getProductList = async () => {
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    let response = await AxiosRequest(apiKey, PRODUCT_LIST_URL);
    console.log(response);
    console.log(JSON.stringify(response + 'response'));
    setProductList(response);
    products = response;
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

  return (
    <View style={styles.continue}>
        <GreenText
          label={'Products'}
          customStyle={{alignSelf: 'center', marginTop: 20, marginBottom: 10}}
        />
      <FlatList
        numColumns={2}
        ItemSeparatorComponent={renderSpace}
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
        style={styles.flatList}
      />
      
        {/* <SubmitButton
          label={'VIEWCART '}
          onButtonPress={onViewCart}
          customStyle={{width: 100, marginLeft: 100}}
        /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  continue: {
    flex: 2,
  },

  imageStyle: {
    height: 100,
    width: 100,
  },
  flatList: {
    marginLeft: 20,
  },
  itemStyle: {
    marginRight: '5%',
    marginRight: '5%',
    marginTop: 15,
    borderWidth: 1,
    padding: 30,
    borderRadius: 5,
    backgroundColor: WHITE_BACK,
    borderColor: WHITE_BACK,
  },
});
export default ProductsListScreen;
