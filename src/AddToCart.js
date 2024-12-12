import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {productState} from './state/Atom';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {DELETE_CART_URL, PRODUCT_LIST_URL, VIEW_CART} from './utils/Url';
import GreenText from './components/atoms/GreenText';
import BlackText from './components/atoms/BlackText';
import {AxiosRequest} from './utils/AxiosRequest';
import {PRODUCT_LIST} from './utils/Constant';
import SubmitButton from './components/atoms/Button';
import {BLACK} from './utils/Colors';
import FooterButton from './components/atoms/Footer';

const MyCart = () => {
  useEffect(() => {
    onViewCart();
  }, []);
  const navigation = useNavigation();
  const [productList, setProductList] = useState('');
  const [productId, setProductId] = useRecoilState(productState);
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
  const onViewCart = async () => {
    let apiKey = new FormData();
    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('user_id', '1');
    apiKey.append('product_id', productId);

    let response = await AxiosRequest(apiKey, VIEW_CART);
    console.log(JSON.stringify(response) + 'response');
    setProductList(response);
  };

  const onDeleteProduct = async () => {
    let apiKey = new FormData();

    apiKey.append('api_key', 'YW9N0gqw5sNn96D3ozMcXQ4VEEuiMm82');
    apiKey.append('product_id', productId);
    apiKey.append('user_id', '1');
    console.log(apiKey);

    let response = await AxiosRequest(apiKey, DELETE_CART_URL);
    console.log(JSON.stringify(response) + 'response');
    if (response.status == 'error') {
      navigation.navigate(PRODUCT_LIST);
      console.log('Product Deleted Successfully..!');
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

      <Image source={{uri: imageBase + image}} style={styles.imageStyle} />
      {console.log(imageBase + image)}

      <BlackText label={name} />
      <BlackText label={price} customStyle={{color: 'red'}} />
      <BlackText label={qty} />
      <SubmitButton
        label={'Remove'}
        onButtonPress={onDeleteProduct}
        customStyle={{width: 100, marginLeft: 250, color: BLACK}}
      />
    </View>
  );
  const onAddMore = () => {
    navigation.navigate(PRODUCT_LIST);
  };
  const onBuyNow = () => {
    // navigation.navigate();
  };
  return (
    <ScrollView>
      <GreenText
        label={'My Cart'}
        customStyle={{alignSelf: 'center', marginTop: 20, marginBottom: 10}}
      />
      <FlatList
        numColumns={1}
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

      <GreenText label={'Total Amount:'} customStyles={styles.child} />
      <GreenText label={'$'} />
      <Text>
        <SubmitButton
          label={'Add More'}
          onButtonPress={onAddMore}
          customStyle={{width: 200,alignSelf:'flex-start', }}
        />
        <SubmitButton
          label={'Buy Now'}
          onButtonPress={onBuyNow}
          customStyle={{width: 200,alignSelf:'flex-end',}}
        />
      </Text>
      {/* <FooterButton label1={'Add More'}onButtonPress1={navigation.navigate(PRODUCT_LIST)} /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    height: 40,
    width: 40,
    
  },
  child: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    marginTop: 50,
  },
});
export default MyCart;
